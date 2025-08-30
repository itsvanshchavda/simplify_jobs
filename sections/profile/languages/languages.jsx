"use client"

import { useUser } from '@/context/userContext';
import React, { useEffect, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaLightbulb } from 'react-icons/fa';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import UpdateUserApi from '@/apis/user/UpdateUser';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const proficiencies = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

const Languages = () => {
    const { state, dispatch } = useUser();
    const user = state?.user;

    const [languages, setLanguages] = useState(user?.languages || []);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentLanguage, setCurrentLanguage] = useState('');
    const [currentProficiency, setCurrentProficiency] = useState(proficiencies[0]);

    const handleAddNewLanguage = () => {
        if (currentLanguage.trim() === '') return;

        const exists = languages.find(
            (lang) => lang.name.toLowerCase() === currentLanguage.toLowerCase()
        );

        if (exists) {
            toast.error('Language already exists');
            return;
        }

        const newLang = {
            name: currentLanguage,
            proficiency: currentProficiency,
        };

        setLanguages([...languages, newLang]);
        setCurrentLanguage('');
        setCurrentProficiency(proficiencies[0]);
    };

    const handleRemoveLanguage = (langToRemove) => {
        setLanguages(languages.filter((lang) => lang.name !== langToRemove.name));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const res = await UpdateUserApi({ languages });

        if (res.error) {
            toast.error(res.error);
        } else {
            dispatch({ type: 'SET_USER', payload: res });
            setOpenDialog(false);
            toast.success('Languages updated successfully');
        }
        setLoading(false);
    };

    return (
        <div className='bg-white p-6 flex flex-col gap-4 max-w-hero h-fit rounded-md border border-gray-200'>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="hidden"><span /></DialogTrigger>
                <DialogContent zIndex={40} className="!max-w-[45rem]">
                    <DialogHeader>
                        <div className='flex items-center gap-4'>
                            <div className='p-2.5 flex justify-center items-center text-primary-blue rounded-full bg-primary-lighter'>
                                <FaLightbulb className='size-6' />
                            </div>
                            <DialogTitle className="font-circular font-medium">
                                Add New Languages
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center py-4 flex-col gap-2'>
                            <div className='text-center font-circular text-gray-800'>
                                Add the languages you know with proficiency level
                            </div>
                            <div className='flex gap-2 w-full max-w-[450px]'>
                                <input
                                    value={currentLanguage}
                                    onChange={(e) => setCurrentLanguage(e.target.value)}
                                    placeholder="e.g. English, Hindi"
                                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4"
                                    type="text"
                                />

                                <Select value={currentProficiency} onValueChange={setCurrentProficiency}>
                                    <SelectTrigger className="w-[180px] font-circular !h-[40px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className={"z-50"}>
                                        {proficiencies.map((p, i) => (
                                            <SelectItem className={"font-circular"} key={i} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div
                                    onClick={handleAddNewLanguage}
                                    className='bg-primary-blue font-circular text-white px-4 rounded-md cursor-pointer flex justify-center items-center hover:bg-cyan-600 duration-300'
                                >
                                    Add
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap mx-auto items-center justify-center max-w-[800px] px-[2rem] gap-3'>
                            {languages.map((lang, index) => (
                                <div key={index} className='flex cursor-pointer px-3 py-1 border border-gray-300 rounded-full items-center gap-2'>
                                    <div className='text-black/80 text-sm font-circular'>
                                        {lang.name} - {lang.proficiency}
                                    </div>
                                    <X onClick={() => handleRemoveLanguage(lang)} size={15} className='text-gray-700' />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center gap-2 justify-center'>
                        <button
                            disabled={loading}
                            onClick={() => setOpenDialog(false)}
                            className='w-full text-sm font-circular font-medium duration-300 hover:bg-gray-50 border p-2 rounded-md'
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className='w-full text-sm border font-circular font-medium hover:bg-cyan-600 duration-300 border-primary-blue bg-primary-blue p-2 text-white rounded-md'
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className='flex justify-between items-center'>
                <div className='font-medium font-circular text-lg'>Languages</div>
                <div onClick={() => setOpenDialog(true)} className='p-1.5 bg-gray-50 rounded-md border border-gray-200 cursor-pointer'>
                    <RiPencilFill color='gray' />
                </div>
            </div>

            <div>
                {languages.length === 0 ? (
                    <div className='font-circular text-sm text-gray-600'>No languages added</div>
                ) : (
                    <div className='flex flex-wrap gap-2'>
                        {languages.map((lang, index) => (
                            <div key={index} className='bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full font-circular'>
                                {lang.name} ({lang.proficiency})
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Languages;
