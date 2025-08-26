"use client"
import GetResumeById from '@/apis/resume/GetResumeByIdApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ResumeForm from './resumeform'
import { HiArrowLongLeft, HiOutlinePaintBrush } from "react-icons/hi2";
import EditorHeader from './editorheader'

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
import { IoCheckmarkCircle, IoEye } from "react-icons/io5";

import { AiOutlineLoading } from "react-icons/ai";
import { ResumeTemplate1 } from './templates/resumetemplate1'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoPencil } from "react-icons/io5";
import { MdModeEdit } from 'react-icons/md'


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
        <div className="min-h-screen">
            <EditorHeader savedtime={fullResume?.updatedAt} />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <span />
                <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                    <DialogHeader>
                        <DialogTitle className="font-circular font-semibold">
                            Edit Title
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex bg-gray-50 p-4 border rounded-md border-gray-100 items-center gap-2">
                        <FcIdea className="w-8 h-8" />
                        <div className="font-circular text-gray-500 text-sm">
                            You can name your resume anything you like. It will automatically be saved as first name_last name_resume for autofill
                        </div>
                    </div>

                    <input
                        placeholder="File Name"
                        type="text"
                        value={filename}
                        onChange={(e) => setFileName(e.target.value)}
                        className="p-3 font-circular h-10 w-full rounded-sm text-sm border border-gray-200 focus:border-blue-500 focus:outline-none"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenDialog(!openDialog)}
                            className="flex-1 border py-2 rounded-md px-4 font-circular"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdateFilename}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-circular"
                        >
                            {updateLoading && <AiOutlineLoading className="animate-spin w-5 h-5 mx-auto" />}
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Mobile Tabs (show only on small screens) */}
            <div className="lg:hidden">
                <Tabs defaultValue="edit" className="w-full">
                    <div className="sticky top-0 bg-white z-10 px-4 py-2 border-b">
                        <TabsList className="w-full bg-gray-100 rounded-lg h-12 grid grid-cols-2">
                            <TabsTrigger className="flex items-center gap-2 rounded-lg" value="edit">
                                <MdModeEdit />
                                Edit
                            </TabsTrigger>
                            <TabsTrigger className="flex items-center gap-2 rounded-lg" value="preview">
                                <IoEye />
                                Preview
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="edit" className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="font-circular font-medium text-xl text-gray-700">
                                    {fullResume?.filename?.replace(/\.(pdf|docx)$/i, "")}
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiPencil
                                        onClick={() => setOpenDialog(!openDialog)}
                                        className="w-5 h-5 text-gray-500 cursor-pointer"
                                    />
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <IoMdInformationCircle className="w-5 h-5 text-gray-500" />
                                        </TooltipTrigger>
                                        <TooltipContent variant="gray">
                                            <div className="font-circular text-sm max-w-xs p-2">
                                                You can name your resume anything you like, for example: firstname_lastname.pdf
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="p-4 bg-white border rounded-md">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <IoCheckmarkCircle className="w-4 h-4 text-gray-500" />
                                        <div className="font-circular text-gray-500 text-sm">
                                            Tailor your resume to a job
                                        </div>
                                    </div>
                                    <div className="font-circular text-black font-medium">
                                        No job added
                                    </div>
                                    <button className="mt-2 border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                        Tailor to Job
                                    </button>
                                </div>
                            </div>

                            <ResumeForm setResume={setResume} resume={resume} />
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                        <div className="bg-white border-8 border-blue-100 w-full">
                            <div className="relative">
                                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold transform rotate-12 translate-x-2 -translate-y-1">
                                    Preview
                                </div>
                                <ResumeTemplate1 userResume={resume} />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Desktop Layout (show only on large screens) */}
            <div className="hidden lg:flex h-[calc(100vh-80px)]">
                {/* Left Side - Edit Form */}
                <div className="w-1/2 overflow-y-auto border-r">
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-2 text-gray-500 font-circular">
                            <HiArrowLongLeft className="w-5 h-5" />
                            Documents
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="font-circular font-medium text-2xl text-gray-700">
                                {fullResume?.filename?.replace(/\.(pdf|docx)$/i, "")}
                            </div>
                            <div className="flex items-center gap-1">
                                <HiPencil
                                    onClick={() => setOpenDialog(!openDialog)}
                                    className="w-6 h-6 text-gray-500 cursor-pointer"
                                />
                                <Tooltip>
                                    <TooltipTrigger>
                                        <IoMdInformationCircle className="w-5 h-5 text-gray-500" />
                                    </TooltipTrigger>
                                    <TooltipContent variant="gray">
                                        <div className="font-circular text-sm max-w-xs p-4">
                                            You can name your resume anything you like, for example: firstname_lastname.pdf or firstname_lastname.docx.
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="p-5 bg-white border rounded-md">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <IoCheckmarkCircle className="w-4 h-4 text-gray-500" />
                                        <div className="font-circular text-gray-500 text-sm">
                                            Tailor your resume to a job
                                        </div>
                                    </div>
                                    <div className="font-circular text-black font-medium">
                                        No job added
                                    </div>
                                </div>
                                <button className="mt-2 border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                    Tailor to Job
                                </button>
                            </div>
                        </div>

                        <ResumeForm setResume={setResume} resume={resume} />
                    </div>
                </div>

                {/* Right Side - Preview */}
                <div className="w-1/2 overflow-y-auto bg-gray-50">
                    <div className="p-6 pt-8 flex justify-center">
                        <div className="w-full max-w-[45rem]">
                            <div className="relative bg-white border-[20px] border-primary-lighter">

                                <div className="overflow-hidden">
                                    <ResumeTemplate1 userResume={resume} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResumeEditor