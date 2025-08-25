"use client"
import GetResumeById from '@/apis/resume/GetResumeByIdApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ResumeForm from './resumeform'
import { HiArrowLongLeft, HiOutlinePaintBrush } from "react-icons/hi2";
import EditorHeader from './editorheader'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TbEdit } from "react-icons/tb";
import { HiPencil } from "react-icons/hi";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoMdInformationCircle } from "react-icons/io";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcIdea } from "react-icons/fc";
import UpdateResumeApi from '@/apis/resume/UpdateResumeApi'
import { IoCheckmarkCircle } from "react-icons/io5";

import { AiOutlineLoading } from "react-icons/ai";


const ResumeEditor = () => {
    const [resume, setResume] = useState(null)

    const [fullResume, setFullResume] = useState(null)
    const params = useSearchParams();
    const resumeId = params.get('id');
    const effectRun = useRef(false)
    const [filename, setFileName] = useState(fullResume?.filename || "")
    const [updateLoading, setUpdateLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const getResume = async () => {

        const res = await GetResumeById(resumeId)

        if (res.error) {
            toast.error(res.error)
            return
        }

        setFullResume(res?.resume)
        setResume(res?.resume?.json)
        // Remove .pdf or .docx extension from filename
        const rawFilename = res?.resume?.filename || "";
        const cleanFilename = rawFilename.replace(/\.(pdf|docx)$/i, "");
        setFileName(cleanFilename);


    }


    useEffect(() => {

        if (effectRun.current == false) {
            getResume()
        }

        return () => {
            effectRun.current = true
        }

    }, [resumeId])

    const handleUpdateFilename = async () => {
        setUpdateLoading(true)
        const res = await UpdateResumeApi({ filename, resumeId })


        if (res.error) {
            setUpdateLoading(false)
            toast.error(res.error)
            return
        }

        toast.success("Resume updated successfully")
        setFullResume(res?.resume)
        setResume(res?.resume?.json)
        setOpenDialog(false)
        setUpdateLoading(false)

    };


    return (
        <div>
            <EditorHeader savedtime={fullResume?.updatedAt} />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <span />
                <DialogContent className={"w-[90%] flex flex-col gap-5 sm:max-w-[400px]"} zIndex={100}>
                    <DialogHeader>
                        <DialogTitle className={"font-circular font-semibold"}>
                            Edit Title

                        </DialogTitle>

                    </DialogHeader>


                    <div className='flex bg-gray-50 p-4 border rounded-md border-gray-100 items-center gap-2'>
                        <FcIdea className='size-8' />

                        <div className='font-circular text-gray-500 text-sm '>
                            You can name your resume anything you like. It will automatically be saved as first name_last name_resume for autofill

                        </div>
                    </div>

                    <div>
                        <input
                            placeholder="File Name"
                            type="text"
                            value={filename}
                            onChange={(e) => setFileName(e.target.value)}
                            className=
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"


                        />
                    </div>


                    <div className='flex font-circular  w-full items-center gap-2 '>
                        <button onClick={() => setOpenDialog(!openDialog)} className='border w-full py-2 rounded-md px-4'>
                            Cancel
                        </button>

                        <button onClick={handleUpdateFilename} className='w-full bg-primary-blue text-white  py-2 px-4 rounded-md '>
                            {updateLoading && <AiOutlineLoading className='animate-spin size-5 mx-auto' />}
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex items-start justify-between gap-6">



                {/* Left Content */}
                <div className="w-full h-full overflow-y-auto flex flex-col gap-4 p-6 px-10">
                    <div className='flex items-center justify-between'>
                        <div className='flex font-circular text-gray-500 font-medium items-center gap-2'>
                            <HiArrowLongLeft size={20} />

                            Documents


                        </div>

                        <Tabs defaultValue="editcontent" className="">
                            <TabsList className={"border py-5 bg-white font-circular"}>
                                <TabsTrigger
                                    className="data-[state=active]:border-primary-blue py-4 text-gray-600 data-[state=active]:text-primary-blue "
                                    value="editcontent"
                                >
                                    <TbEdit />
                                    Edit Content
                                </TabsTrigger>

                                <TabsTrigger
                                    className="data-[state=active]:border-primary-blue py-4 text-gray-600 data-[state=active]:text-primary-blue"
                                    value="editdesign"
                                >
                                    <HiOutlinePaintBrush />
                                    Edit Design
                                </TabsTrigger>

                            </TabsList>

                        </Tabs>



                    </div>



                    <div className='flex items-center gap-3'>
                        <div className='font-circular font-medium text-2xl text-gray-700'>
                            {fullResume?.filename?.replace(/\.(pdf|docx)$/i, "")}
                        </div>


                        <div className='flex items-center gap-1'>
                            <HiPencil onClick={() => setOpenDialog(!openDialog)} color='gray' className='size-6 cursor-pointer  ' />

                            <Tooltip>
                                <TooltipTrigger><IoMdInformationCircle className='size-5' color='gray' /></TooltipTrigger>
                                <TooltipContent variant='gray'>
                                    <div className='font-circular  text-sm max-w-[300px]  pl-4 pr-4 py-2'>
                                        You can name your resume anything you like, for example: firstname_lastname.pdf or firstname_lastname.docx.

                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    <div className='p-5   bg-white border rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-2'>
                                    <IoCheckmarkCircle color='gray' className='size-4' />
                                    <div className='font-circular text-gray-500 text-sm'>
                                        Tailor your resume to a job
                                    </div>
                                </div>

                                <div className='font-circular text-black font-medium'>
                                    No job added



                                </div>
                            </div>

                            <button className='border-primary-blue text-primary-blue font-circular border px-4 py-1.5 rounded-md text-sm'>
                                Tailor to Job
                            </button>
                        </div>
                    </div>

                    <ResumeForm setResume={setResume} resume={resume} />
                </div>


                {/* Preview Box */}
                <div className="sticky top-[7rem] shrink-0 mx-[8rem] overflow-hidden w-[40rem]">
                    {/* Inner Box with Border */}
                    <div className="relative bg-white border-[24px] border-primary-lighter h-[800px] w-full">
                        {/* Ribbon */}
                        <div className="absolute top-0 -right-16 z-10 w-[170px] rotate-45  py-1 text-center font-bold text-white bg-primary-light">
                            Preview
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ResumeEditor