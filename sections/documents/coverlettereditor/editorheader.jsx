"use client"
import React, { useState } from 'react'
import Logo from '@/public/icons/logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LuFileCheck, LuFileWarning } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineFileDownload, MdRemoveRedEye } from "react-icons/md";
import { IoLockClosedOutline, IoMenu } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from 'lucide-react'
import { IoMdSearch, IoMdTrash } from "react-icons/io";
import { SlRefresh } from "react-icons/sl";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FileIcon from '@/public/icons/fileicon'
import { FiFileText, FiLink } from 'react-icons/fi'
import downloadPdf from '@/utils/downloadpdf'


const EditorHeader = ({ unsaved, savedtime, handleSave, updateLoading, url, filename }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [search, setSearch] = useState("")

    const handleBack = () => {
        window.history.back();
    }

    const getTimeAgo = (timestamp) => {
        const postTime = new Date(timestamp);
        const now = new Date();

        const diff = Math.floor((now - postTime) / 1000); // seconds

        if (diff < 60) return `${diff} sec ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)} day ago`;
        if (diff < 31536000) return `${Math.floor(diff / 2592000)} month ago`;
        return `${Math.floor(diff / 31536000)} yr ago`;
    };


    return (
        <div>
            {/* Resume Preview Dialog */}
            <Dialog open={openPreview} onOpenChange={setOpenPreview}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent className="w-[95%] !max-w-[75rem] pt-10 mx-auto border-none outline-none p-4 rounded-xl">
                    <DialogHeader className={"hidden"}>
                        <DialogTitle>Resume Preview</DialogTitle>
                    </DialogHeader>

                    <div className='flex items-center gap-4'>
                        <div className='p-2 bg-primary-lighter rounded-md'>
                            <FileIcon />
                        </div>
                        <div className='flex flex-col'>
                            <div className='font-circular tracking-wide text-sm sm:text-xl font-medium'>
                                Resume Preview
                            </div>
                            <div className='font-circular flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm '>
                                demo-resume.pdf <span className='text-[11px] text-gray-300'>•</span>
                                <span className='font-normal text-xs'>Modified : {getTimeAgo()}</span>
                            </div>
                        </div>
                    </div>
                    <iframe
                        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://example.com/sample.pdf`}
                        width="100%"
                        height="600"
                        style={{ border: "none" }}
                    />
                </DialogContent>
            </Dialog>

            {/* Search Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent className="w-[90%] !max-w-[43rem] flex flex-col gap-5">
                    <DialogHeader >
                        <div className='flex items-center gap-4'>
                            <div className='p-2 bg-primary-lighter rounded-md'>
                                <FileIcon />
                            </div>
                            <DialogTitle className="font-circular font-semibold">
                                Search Resumes
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className='flex flex-col gap-6'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search by name"
                            className="p-3 font-circular h-10 block w-full rounded-sm text-sm border border-gray-200"
                        />

                        {/* Example resumes */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='p-3 bg-primary-light rounded-full aspect-square'>
                                    <FiFileText className={"text-white size-4 sm:size-6"} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='font-circular sm:max-w-[200px] max-w-[90px] truncate sm:text-base text-sm font-medium'>
                                        demo-resume.pdf
                                    </div>
                                    <div className='hidden sm:flex items-center gap-2'>
                                        <div className='text-xs font-circular font-light tracking-wide text-gray-500'>
                                            Modified : {getTimeAgo()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdRemoveRedEye onClick={() => setOpenPreview(true)} size={20} className='cursor-pointer' color='gray' />
                                <button className='bg-gray-100 text-gray-600 text-[13px] font-circular px-8 py-1 rounded-md'>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Header */}
            <div className='w-full flex px-[1rem] xl:px-[2.5rem] justify-between lg:items-center sticky top-0 bg-white shadow-sm'>
                <div className='cursor-pointer' onClick={handleBack}>
                    <div className='flex h-[60px] items-center gap-3'>
                        <Logo size='115' />
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    {updateLoading ? (
                        <div className='flex items-center gap-2'>
                            <SlRefresh className='animate-spin' color='gray' />
                            <div className='font-circular text-gray-500 text-sm font-medium'>
                                Saving...
                            </div>
                        </div>
                    ) : unsaved ? (
                        <div onClick={handleSave} className='flex cursor-pointer items-center gap-2'>
                            <LuFileWarning color='gray' />
                            <div className='font-circular text-gray-500 text-[12px] sm:text-sm font-medium'>
                                Unsaved changes
                            </div>
                        </div>
                    ) : (
                        <div onClick={handleSave} className='flex cursor-pointer items-center gap-2'>
                            <LuFileCheck color='gray' />
                            <div className='font-circular text-gray-500 text-[12px] sm:text-sm font-medium'>
                                Saved {getTimeAgo(savedtime)}
                            </div>
                        </div>
                    )}



                    {/* Export */}
                    <div onClick={async () => {
                        await downloadPdf(url, filename)
                    }} className='hidden sm:flex border text-sm px-4 py-1.5 bg-primary-blue text-white font-circular font-medium rounded-md items-center gap-2 cursor-pointer'>
                        <MdOutlineFileDownload className='size-4' />
                        Export
                    </div>
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default EditorHeader
