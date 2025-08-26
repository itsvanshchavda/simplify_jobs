"use client"
import React, { useState } from 'react';
import { ChevronUp, Plus, X } from 'lucide-react';
import { RiEditFill } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import UpdateEducation from '../updatesections/updateeducation';
import { BsTrashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Education = ({ setResume, resume }) => {
    const [open, setOpen] = useState(false);
    const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [hideEducation, setHideEducation] = useState(false);
    const handleEditEducation = (index) => {
        setSelectedEducationIndex(index);
        setOpen(true);
    };

    const formatDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) return '';
        return `${startDate.month} ${startDate.year} - ${endDate.month} ${endDate.year}`;
    };

    const handleAddNewEducation = () => {
        const newEducation = {
            school: "",
            location: "",
            degree: "",
            fieldOfStudy: "",
            startDate: { month: "", year: "" },
            endDate: { month: "", year: "" },
            present: false,
            description: "",
        };

        setResume((prevResume) => ({
            ...prevResume,
            parsedEducation: [...(prevResume.parsedEducation || []), newEducation],
        }));

        toast.success("New education added successfully!");
    };

    const handleRemoveEducation = () => {
        setResume((prevResume) => ({
            ...prevResume,
            parsedEducation: prevResume.parsedEducation.filter((_, i) => i !== currentIndex),
        }));

        toast.success(`Education entry ${currentIndex + 1} removed successfully!`);
        setOpenDelete(false);
    };

    return (
        <div className='flex flex-col gap-4'>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle className="text-base text-black/80 font-medium">
                            Delete Education
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Are you sure you want to delete this resume?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-start gap-2 py-4">
                        <div className="text-lg text-black/80 font-medium">
                            Delete Education
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                            Are you sure you want to delete this resume? You won't be able to undo this action.
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            className="flex-1 min-w-0"
                            variant="outline"
                            onClick={() => setOpenDelete(false)}
                        >
                            No
                        </Button>

                        <Button
                            style={{ outline: "none" }}
                            onClick={handleRemoveEducation}
                            className="bg-[#E11D48] hover:bg-[#e11d47c2] hover:text-white flex-1 min-w-0 font-medium text-white"
                        >
                            Yes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className='hidden'>
                    <span />
                </SheetTrigger>
                <SheetContent className="w-full rounded-4xl rounded-r-none !max-w-[50rem]">
                    <SheetHeader className="py-5">
                        <div className="flex items-start justify-between border-b pb-4 px-6">
                            <SheetTitle>
                                <div className="flex text-xl items-center gap-2 font-circular font-medium">
                                    <div className="p-2 rounded-full bg-primary-lighter">
                                        <PiStudent size={20} className="text-primary-blue size-6" />
                                    </div>
                                    Edit Education
                                </div>
                            </SheetTitle>

                            <SheetClose style={{ outline: "none" }}>
                                <div
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 cursor-pointer transition-all text-gray-600 font-circular font-medium text-sm"
                                >
                                    <X className='size-6 text-gray-400' />
                                </div>
                            </SheetClose>
                        </div>
                    </SheetHeader>

                    <UpdateEducation
                        setResume={setResume}
                        resume={resume}
                        educationIndex={selectedEducationIndex}
                        onClose={() => setOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            {/* Section */}
            <div className={`p-6 bg-white border rounded-md`}>
                <div className={`flex items-center  justify-between cursor-pointer`}>
                    <div className='font-circular font-medium text-2xl text-gray-700'>Education</div>

                    <div className='flex items-center gap-4'>
                        {!hideEducation && (
                            <div
                                onClick={handleAddNewEducation}
                                className={`flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 border border-gray-200 rounded-md`}
                            >
                                <div className='font-circular sm:block hidden font-medium text-sm text-gray-700'>Add New Education</div>
                                <div className='font-circular sm:hidden block font-medium text-sm text-gray-700'>Add New</div>
                                <Plus className=' text-gray-500' size={20} strokeWidth={1} />
                            </div>
                        )}

                        <div onClick={() => setHideEducation(!hideEducation)} className={`p-1 border border-gray-100 rounded-md bg-gray-50 transition-transform ${hideEducation ? "rotate-0" : "-rotate-180"}`}>
                            <ChevronUp className='text-gray-500' strokeWidth={1} />
                        </div>
                    </div>
                </div>

                {!hideEducation && (
                    <div className={`flex flex-col gap-4 mt-4`}>
                        {resume?.parsedEducation?.map((education, index) => (
                            <div key={index} className='bg-gray-50 px-[1rem] flex justify-between items-center flex-1 p-2.5 border border-gray-50 rounded-md min-h-[50px]'>
                                <div className="flex flex-col">
                                    {/* Degree + Field */}
                                    <div className="font-circular line-clamp-1 font-medium text-base">
                                        {index + 1}. {education.degree || "Degree not specified"}
                                        {education.fieldOfStudy ? ` in ${education.fieldOfStudy}` : ""}
                                    </div>

                                    {/* Date + Location */}
                                    <div className="text-gray-400 line-clamp-1 hidden sm:flex items-center gap-2 px-4 font-circular font-medium text-sm">
                                        {education?.startDate?.month && education?.endDate ? (
                                            <div className="flex items-center gap-2">
                                                {formatDateRange(education.startDate, education.endDate)}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Dates not specified
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px]">•</span> {education.location || "Location not specified"}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <BsTrashFill
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setOpenDelete(true);
                                        }}
                                        color='gray'
                                        className='cursor-pointer hover:text-primary-blue transition-colors'
                                    />
                                    <RiEditFill
                                        onClick={() => handleEditEducation(index)}
                                        className='cursor-pointer hover:text-primary-blue transition-colors'
                                        color='gray'
                                    />
                                </div>
                            </div>
                        ))}

                        {(!resume?.parsedEducation || resume.parsedEducation.length === 0) && (
                            <div className='bg-gray-50 px-[1rem] flex justify-center items-center p-4 border border-gray-200 rounded-md'>
                                <div className='text-gray-500 font-circular font-medium text-sm'>
                                    No education found. Click to add your education.
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Education;
