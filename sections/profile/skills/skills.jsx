"use client"

import { useUser } from '@/context/userContext';
import React, { useEffect, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaLightbulb } from 'react-icons/fa';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import UpdateUserApi from '@/apis/user/UpdateUser';

const Skills = () => {

    const { state, dispatch } = useUser();
    const user = state?.user;
    const [currentSkill, setCurrentSkill] = useState('');
    const [skills, setSkills] = useState(user?.skills || []);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddNewSkill = () => {



        if (currentSkill.trim() !== '') {
            if (currentSkill && !skills.includes(currentSkill)) {
                setSkills([...skills, currentSkill]);
                setCurrentSkill('');
            } else {
                toast.error('Skill already exists');
            }
        }
    };



    const handleRemoveSkills = (skillToRemove) => {
        const removed = skills.filter((skill) => skill !== skillToRemove);
        setSkills(removed);
    };


    const handleSubmit = async () => {
        setLoading(true);
        const res = await UpdateUserApi({ skills });

        if (res.error) {
            setLoading(false);
            toast.error(res.error);
        } else {
            dispatch({ type: 'SET_USER', payload: res });
            setOpenDialog(false);
            toast.success('Skills updated successfully');
            setLoading(false);
        }
    }



    return (
        <div className='bg-white p-6 flex flex-col gap-4 max-w-hero h-fit rounded-md border border-gray-200'>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent zIndex={100} className={"!max-w-[45rem]"}>
                    <DialogHeader>

                        <div className='flex items-center gap-4'>

                            <div className='p-2.5 flex justify-center items-center text-primary-blue rounded-full bg-primary-lighter'>
                                <FaLightbulb className='size-6' />
                            </div>
                            <DialogTitle className={"font-circular font-medium"}>
                                Add New Skills
                            </DialogTitle>

                        </div>
                    </DialogHeader>


                    <div className='flex flex-col gap-6'>


                        <div className='flex items-center py-4 flex-col gap-2'>

                            <div className='text-center font-circular  text-gray-800'>
                                Skills that you'd prefer to utilize in roles are add here

                            </div>
                            <div className='flex gap-2 w-full max-w-[450px]'>
                                <input
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddNewSkill();
                                        }
                                    }}
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    placeholder="e.g. JavaScript, React, Node.js"
                                    className=
                                    "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"

                                    type="text"
                                />

                                <div onClick={handleAddNewSkill} className='bg-primary-blue font-circular text-white px-4 rounded-md cursor-pointer flex justify-center items-center hover:bg-cyan-600 duration-300'>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap mx-auto items-center justify-center max-w-[800px] px-[2rem] gap-3'>
                            {skills.map((skill, index) => (
                                <div key={index} className='flex cursor-pointer px-3 py-1 border border-gray-300 rounded-full items-center gap-2'>
                                    <div className=' text-black/80 text-sm font-normal font-circular'>
                                        {skill}
                                    </div>

                                    <X onClick={() => handleRemoveSkills(skill)} size={15} className='text-gray-700' />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='flex items-center gap-2 justify-center'>
                        <button disabled={loading} className='w-full text-sm font-circular font-medium duration-300 hover:bg-gray-50 border p-2 rounded-md'>
                            Cancel
                        </button>

                        <button
                            disabled={loading}

                            onClick={handleSubmit} className='w-full text-sm border font-circular font-medium hover:bg-cyan-600 duration-300 border-primary-blue bg-primary-blue p-2 text-white rounded-md'>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


            <div className='flex justify-between items-center'>
                <div className='font-medium font-circular text-lg'>
                    Skills
                </div>
                <div onClick={() => setOpenDialog(true)} className='p-1.5 bg-gray-50 rounded-md border border-gray-200 cursor-pointer'>
                    <RiPencilFill color='gray' />
                </div>
            </div>


            <div>
                {skills.length === 0 ? (
                    <div className='font-circular text-sm text-gray-600'>
                        No skills added


                    </div>
                ) : (
                    <div className='flex flex-wrap gap-2'>
                        {skills.map((skill, index) => (
                            <div key={index} className='flex flex-col gap-2'>

                                <div>
                                    {skill?.heading}
                                </div>
                                <div className='bg-gray-100 text-gray-800 text-[13px] px-3 py-1 rounded-full font-circular'>
                                    {skill}
                                </div>
                            </div>
                        ))}
                    </div>
                )}



            </div>



        </div>
    )
}

export default Skills