"use client"

import { useUser } from '@/context/userContext'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DOMPurify from "dompurify";
import { RiPencilFill } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LuGraduationCap } from 'react-icons/lu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import AddEducation from './addeducation';
import UpdateUserApi from '@/apis/user/UpdateUser';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const EducationSection = () => {
    const [open, setOpen] = useState(false)
    const { state, dispatch } = useUser()
    const user = state?.user
    const [education, setEducation] = useState(user?.education || []);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [mode, setMode] = useState('')
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const handleAddNew = () => {
        setMode('new');
        const newEducation = {
            degree: '',
            fieldOfStudy: '',
            school: '',
            location: '',
            startDate: { month: '', year: '' },
            endDate: { month: '', year: '' },
        };

        const updated = [...education, newEducation];
        setEducation(updated);
        setCurrentIndex(updated.length - 1);

        setOpen(true);
    };

    const handleEdit = (index) => {
        setMode('edit');
        setCurrentIndex(index);
        setOpen(true);
    };

    const handleRemoveEducation = async () => {
        setDeleteLoading(true);
        const updatedEducation = education.filter((_, i) => i !== currentIndex);
        setEducation(updatedEducation);
        setOpenDelete(false);

        const res = await UpdateUserApi({ education: updatedEducation });

        if (res.error) {
            setDeleteLoading(false);
            toast.error(res.error);
            return;
        }
        dispatch({ type: "SET_USER", payload: res });
        toast.success("Education deleted successfully");
        setDeleteLoading(false);
    };

    return (
        <div className='bg-white p-6 flex flex-col gap-4 max-w-hero h-fit rounded-md border border-gray-200'>

            {/* Delete Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Delete Education</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this education?</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-start gap-2 py-4">
                        <div className="text-lg text-black/80 font-medium">
                            Delete Education
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                            Are you sure you want to delete this education? You won't be able to undo this action.
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
                            className="bg-[#E11D48] hover:bg-[#e11d47c2] flex-1 min-w-0 font-medium text-white"
                        >
                            {deleteLoading ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Header */}
            <div className='flex justify-between items-center'>
                <div className='font-medium font-circular text-lg'>
                    Education
                </div>
                <div onClick={handleAddNew} className='p-1.5 bg-gray-50 rounded-md border border-gray-200 cursor-pointer'>
                    <Plus size={17} color='gray' />
                </div>
            </div>

            {/* List */}
            {education && education?.length > 0 ? (
                <div className='flex flex-col gap-4'>
                    {education?.map((item, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='flex justify-between items-start gap-4'>
                                <div className='flex items-center gap-4'>
                                    <img src='/images/education.png' className='size-14' />

                                    <div className='flex flex-col gap-1'>
                                        <div className='font-circular line-clamp-1 font-medium text-base'>
                                            {item?.school}
                                        </div>

                                        <div className='flex line-clamp-1 items-center gap-2 text-sm text-gray-600'>
                                            <div>{item?.degree}</div>
                                            {item?.fieldOfStudy && <span>• {item?.fieldOfStudy}</span>}
                                        </div>

                                        <div className='flex line-clamp-1 items-center gap-2 mt-1'>
                                            {item?.location && (
                                                <div className="bg-gray-50 border px-4 text-xs py-1.5 font-circular rounded-4xl">
                                                    {item.location}
                                                </div>
                                            )}

                                            {(item?.startDate || item?.endDate) && (
                                                <div className="bg-gray-50 border px-4 text-xs py-1.5 font-circular rounded-4xl">
                                                    {item?.startDate && `${item.startDate.month} ${item.startDate.year}`}
                                                    {item?.startDate && item?.endDate && " - "}
                                                    {item?.endDate && `${item.endDate.month} ${item.endDate.year}`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className='flex items-center gap-2'>
                                    <Sheet open={open} onOpenChange={setOpen}>
                                        <SheetTrigger className='hidden'><span /></SheetTrigger>
                                        <SheetContent className="w-full rounded-4xl rounded-r-none !max-w-[50rem]">
                                            <SheetHeader className="py-5">
                                                <div className="flex items-start justify-between border-b pb-4 px-6">
                                                    <SheetTitle>
                                                        <div className="flex text-xl items-center gap-2 font-circular font-medium">
                                                            <div className="p-2 rounded-full bg-primary-lighter">
                                                                <LuGraduationCap size={20} className="text-primary-blue size-6" />
                                                            </div>
                                                            Edit Education
                                                        </div>
                                                    </SheetTitle>
                                                    <SheetClose style={{ outline: "none" }}>
                                                        <div onClick={() => setOpen(false)}>
                                                            <X className='size-6 text-gray-400' />
                                                        </div>
                                                    </SheetClose>
                                                </div>
                                            </SheetHeader>

                                            <AddEducation
                                                setOpen={setOpen}
                                                mode={mode}
                                                education={education}
                                                setEducation={setEducation}
                                                educationIndex={currentIndex}
                                            />
                                        </SheetContent>
                                    </Sheet>

                                    <div onClick={() => handleEdit(index)} className='p-1.5 cursor-pointer border border-gray-200 rounded-md bg-gray-50'>
                                        <RiPencilFill color='gray' />
                                    </div>

                                    <div onClick={() => {
                                        setCurrentIndex(index);
                                        setOpenDelete(true);
                                    }} className='p-1.5 border cursor-pointer border-gray-200 rounded-md bg-gray-50'>
                                        <IoMdTrash color='gray' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='font-circular text-sm text-gray-600'>
                    No education added
                </div>
            )}
        </div>
    )
}

export default EducationSection
