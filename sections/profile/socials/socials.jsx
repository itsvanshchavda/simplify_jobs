"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/userContext';
import toast from 'react-hot-toast';
import { RiPencilFill } from 'react-icons/ri';
import UpdateUserApi from '@/apis/user/UpdateUser';

const Socials = () => {
    const { state, dispatch } = useUser();
    const user = state?.user;

    const [socials, setSocials] = useState({
        linkedIn: user?.socialLinks?.linkedIn || '',
        github: user?.socialLinks?.github || '',
        website: user?.socialLinks?.website || ''
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

    const handleUpdateSocials = async () => {
        const invalidFields = Object.entries(socials)
            .filter(([_, value]) => value && !urlRegex.test(value))
            .map(([key]) => key);

        if (invalidFields.length) {
            toast.error(`Invalid URL in: ${invalidFields.join(', ')}`);
            return;
        }

        setUpdateLoading(true);

        // API call
        try {
            const res = await UpdateUserApi({ socialLinks: socials });
            if (res.error) {
                toast.error(res.error);
            } else {
                dispatch({ type: 'SET_USER', payload: res });
                toast.success('Social links updated successfully');
                setOpenDialog(false);
            }
        } catch (err) {
            toast.error('Something went wrong');
        }

        setUpdateLoading(false);
    };

    return (
        <div className='bg-white p-6 flex flex-col gap-4 max-w-hero h-fit rounded-md border border-gray-200'>
            <div className='flex justify-between items-center'>
                <div className='font-medium font-circular text-lg'>Portfolio & Links</div>
                <div onClick={() => setOpenDialog(true)} className='p-1.5 bg-gray-50 rounded-md border border-gray-200 cursor-pointer'>
                    <RiPencilFill color='gray' />
                </div>
            </div>

            <div className='grid font-circular md:grid-cols-2 gap-6'>
                {['linkedIn', 'github', 'portfolio'].map((key) => (
                    <div key={key} className='flex items-center gap-3'>
                        <img src={`/images/${key}.png`} />
                        <div className='flex flex-col gap-0.5'>
                            <div className='font-circular text-sm font-medium text-gray-600'>
                                {key === 'website' ? 'Portfolio URL' : key.charAt(0).toUpperCase() + key.slice(1) + ' URL'}
                            </div>
                            <div>
                                {socials[key] ? (
                                    <a href={socials[key]} target='_blank' className='text-primary-blue underline line-clamp-1 text-sm break-all'>
                                        {socials[key]}
                                    </a>
                                ) : (
                                    <div className='text-xs text-gray-500'>Not added</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                    <DialogHeader>
                        <DialogTitle className="font-circular font-semibold">Edit Social Links</DialogTitle>
                    </DialogHeader>

                    {['linkedIn', 'github', 'website'].map((key) => (
                        <div key={key} className="flex flex-col gap-1">
                            <label className="font-circular text-sm font-medium">{key === 'website' ? 'Portfolio URL' : key.charAt(0).toUpperCase() + key.slice(1) + ' URL'}</label>
                            <input
                                type="text"
                                placeholder={`Enter ${key} URL`}
                                value={socials[key]}
                                onChange={(e) => setSocials({ ...socials, [key]: e.target.value })}
                                className="p-3 font-circular h-10 w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"
                            />
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenDialog(false)}
                            className="w-full border py-2 rounded-md px-4 font-circular"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdateSocials}
                            className="w-full flex items-center justify-center gap-2 bg-primary-blue text-white py-2 px-4 rounded-md font-circular"
                        >
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Socials;
