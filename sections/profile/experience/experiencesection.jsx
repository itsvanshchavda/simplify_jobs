"use client"

import { useUser } from '@/context/userContext'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
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
import { LuBriefcaseBusiness } from 'react-icons/lu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import AddExperience from './addexperience';
import UpdateUserApi from '@/apis/user/UpdateUser';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const ExperienceSection = () => {
    const [open, setOpen] = useState(false)
    const { state, dispatch } = useUser()
    const user = state?.user
    const [work, setWork] = useState(user?.work || []);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [mode, setMode] = useState('')
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const SafeHTML = ({ html }) => (
        <div
            className="safe-html-content  font-circular text-sm"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
    );


    const handleAddNew = () => {

        const newExperience = {
            title: "",
            company: "",
            location: "",
            startDate: { month: "", year: "" },
            endDate: { month: "", year: "" },
            present: false,
            description: "",
        };

        const updated = [...work, newExperience];
        setWork(updated);
        setCurrentIndex(updated.length - 1);

        setOpen(true);
    };


    const handleEdit = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    }


    const handleRemoveExperience = async () => {
        setDeleteLoading(true);
        const updatedWork = work.filter((_, i) => i !== currentIndex);
        setWork(updatedWork);
        setOpenDelete(false);

        const res = await UpdateUserApi({ work: updatedWork });

        if (res.error) {
            setDeleteLoading(false);
            toast.error(res.error);
            return
        }
        dispatch({ type: "SET_USER", payload: res });

        toast.success("Experience deleted successfully");
        setDeleteLoading(false);
    }



    return (
        <div className='bg-white p-6 flex flex-col gap-4  max-w-hero h-fit rounded-md border border-gray-200'>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle className="text-base text-black/80 font-medium">
                            Delete Experience
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Are you sure you want to delete this experience?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-start gap-2 py-4">
                        <div className="text-lg text-black/80 font-medium">
                            Delete Experience
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                            Are you sure you want to delete this experience? You won't be able to undo this action.
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
                            onClick={handleRemoveExperience}
                            className="bg-[#E11D48] hover:bg-[#e11d47c2] hover:text-white flex-1 min-w-0 font-medium text-white"
                        >
                            {deleteLoading ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>




            <div className='flex justify-between items-center'>
                <div className='font-medium font-circular text-lg'>
                    Work Experience
                </div>


                <div onClick={handleAddNew} className='p-1.5 bg-gray-50 rounded-md border border-gray-200 cursor-pointer'>
                    <Plus size={17} color='gray' />
                </div>

            </div>
            {work && work?.length > 0 ? (
                <div className='flex  flex-col gap-4'>
                    {work?.map((item, index) => (

                        <div key={index} className='flex  flex-col gap-4'>

                            <div className='flex justify-between items-start gap-4'>
                                <div className='flex items-center gap-4'>
                                    <img src='/images/company.png' className='size-14' />

                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center gap-2'>
                                            <div className='font-circular
                                 font-medium line-clamp-1 text-base'>
                                                {item?.title || "Title not specified"}

                                            </div>

                                            <span className='text-gray-700 text-sm'>•</span>

                                            <div className='font-circular
                                 font-medium text-gray-600 line-clamp-1 text-base'>
                                                {item?.company || "Company not specified"}

                                            </div>
                                        </div>


                                        <div className='flex items-center gap-2'>
                                            {item?.locaion && (
                                                <div className="bg-gray-50 border px-4 text-xs py-1.5 font-circular font-normal rounded-4xl">
                                                    {item?.location}
                                                </div>
                                            )}

                                            {(item?.startDate || item?.endDate) && (
                                                <div className="bg-gray-50 border px-4 text-xs py-1.5 font-circular font-normal rounded-4xl">
                                                    {/* Start Date */}
                                                    {item?.startDate && (
                                                        <>
                                                            {item.startDate.month} {item.startDate.year}
                                                        </>
                                                    )}

                                                    {/* Separator */}
                                                    {item?.startDate && item?.endDate && " - "}

                                                    {/* End Date */}
                                                    {item?.endDate && (
                                                        <>
                                                            {item.endDate.month} {item.endDate.year}
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>

                                    <Sheet open={open} onOpenChange={setOpen}>
                                        <SheetTrigger className='hidden'>
                                            <span />
                                        </SheetTrigger>


                                        <SheetContent className="w-full  rounded-4xl rounded-r-none !max-w-[50rem]">
                                            <SheetHeader className="py-5">
                                                <div className="flex items-start justify-between border-b pb-4 px-6">
                                                    <SheetTitle>
                                                        <div className="flex text-xl items-center gap-2 font-circular font-medium">
                                                            <div className="p-2 rounded-full bg-primary-lighter">
                                                                <LuBriefcaseBusiness size={20} className="text-primary-blue size-6" />
                                                            </div>
                                                            Edit Experience
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

                                            <AddExperience
                                                setOpen={setOpen}
                                                work={work}
                                                setWork={setWork}
                                                experienceIndex={currentIndex}

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


                            <SafeHTML html={item?.description} />
                        </div>
                    ))}


                </div>
            ) : (
                <div className='font-circular text-sm text-gray-600'>
                    No experiences added


                </div>
            )}
        </div>
    )
}

export default ExperienceSection