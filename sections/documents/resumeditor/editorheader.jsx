"use client"
import React, { useEffect, useRef, useState } from 'react'
import Logo from '@/public/icons/logo'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LuFileCheck, LuFileWarning } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineFileDownload, MdRemoveRedEye } from "react-icons/md";
import { IoLockClosedOutline, IoMenu } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from 'lucide-react'
import { IoMdSearch, IoMdTrash } from "react-icons/io";

import { IoTrashOutline } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import downloadPdf from '@/utils/downloadpdf'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FileIcon from '@/public/icons/fileicon'
import GetAllResume from '@/apis/resume/GetAllResume'
import toast from 'react-hot-toast'
import { FiFileText, FiLink } from 'react-icons/fi'
import ToggleSharingApi from '@/apis/resume/ToggleSharingApi'
import DeletePopup from '../resume/deletepopup'
import DeleteResumeApi from '@/apis/resume/DeleteResumeApi'



const EditorHeader = ({ unSaved, savedtime, handleSave, saveLoading, fullResume, setFullResume }) => {
    const [resumes, setResumes] = useState([]);
    const [filteredResumes, setFilteredResumes] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const effectRun = useRef(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [selectedResume, setSelectedResume] = useState(null)
    const router = useRouter()
    const params = useSearchParams();
    const [open, setOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [sharing, setSharing] = useState(fullResume?.sharing || false)

    useEffect(() => {
        if (search) {
            const filtered = filteredResumes.filter((resume) =>
                resume.filename.toLowerCase().includes(search.toLowerCase())
            );
            setResumes(filtered);
        } else {
            setResumes(filteredResumes);
        }
    }, [search, filteredResumes]);



    const getResumes = async () => {
        setLoading(true)
        const res = await GetAllResume();

        if (res.error) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setLoading(false)
        setFilteredResumes(res?.resumes)
        setResumes(res?.resumes)
    }

    useEffect(() => {
        if (effectRun.current === false) {
            getResumes();
        }


        return () => {
            effectRun.current = true;
        }
    }, [])


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


    const handleBack = () => {
        window.history.back();
    }


    const download = async () => {
        await downloadPdf(fullResume?.url, `${fullResume?.filename}.pdf`)
    }

    const handleRedirect = () => {
        router.push('/dashboard/documents/resume/new')
    }


    const handleOpenPreview = (resume) => {
        setSelectedResume(resume)
        setOpenPreview(!openPreview)
    };





    const handleSharing = async () => {
        const res = await ToggleSharingApi({ resumeId: fullResume?._id, sharing: !sharing });

        if (res.error) {
            toast.error(res.error);
            return;
        }

        setSharing(!sharing);
        setFullResume(res?.resume)
        toast.success(res.message);
    }



    const deleteResume = async () => {


        setDeleteLoading(true)
        const res = await DeleteResumeApi(fullResume?._id)

        if (res.error) {
            toast.error(res.error)
            setDeleteLoading(false)
            return;
        }

        toast.success("Resume deleted successfully")

        setTimeout(() => {
            router.push('/dashboard/documents')
        }, 1000); // Delay for 1 second before redirecting


        setOpen(false)
        setDeleteLoading(false)
    }

    return (

        <div>

            <DeletePopup open={open} setOpen={setOpen} loading={deleteLoading} handleDelete={deleteResume} />

            <Dialog open={openPreview} onOpenChange={setOpenPreview}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent className="w-[95%]  !max-w-[75rem] pt-10 mx-auto border-none outline-none p-4 rounded-xl"
                    zIndex={100}>
                    <DialogHeader className={"hidden"}>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>

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
                                {selectedResume?.filename} <span className='text-[11px] text-gray-300'>•</span> <span className='font-normal text-xs'>Modified : {getTimeAgo(selectedResume?.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                    <iframe
                        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(selectedResume?.url)}`}
                        width="100%"
                        height="600"
                        style={{ border: "none" }}
                    />




                </DialogContent>
            </Dialog>
            <div className='w-full  flex px-[1rem] xl:px-[2.5rem] justify-between lg:items-center z-50 sticky top-0 bg-white shadow-sm '>





                <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                    <DialogTrigger className="hidden">
                        <span />
                    </DialogTrigger>
                    <DialogContent className="w-[90%] !max-w-[43rem] flex flex-col gap-5" zIndex={100}>
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
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"

                            />


                            {resumes?.length > 0 ? (
                                <>
                                    {resumes?.map((resume, index) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <div className='p-3 bg-primary-light rounded-full aspect-square'>
                                                    <FiFileText

                                                        className={"text-white size-4 sm:size-6"} />
                                                </div>

                                                <div className='flex flex-col gap-1'>

                                                    <div className='font-circular  sm:max-w-[200px] max-w-[90px] pr-2 truncate sm:text-base text-sm font-medium'>
                                                        {resume?.filename}
                                                    </div>

                                                    <div className=' hidden sm:flex items-center gap-2'>
                                                        {resume?.primarys && (
                                                            <div className='bg-primary-lighter text-xs font-circular px-4 py-1 w-fit rounded-xl text-primary-blue'>
                                                                Default
                                                            </div>
                                                        )}

                                                        <div className='text-xs font-circular font-light tracking-wide text-gray-500'>
                                                            Modified : {getTimeAgo(resume?.updatedAt)}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className='flex items-center gap-2'>
                                                <MdRemoveRedEye onClick={() => handleOpenPreview(resume)} size={20} className='cursor-pointer' color='gray' />

                                                <button className='bg-gray-100 text-gray-600  text-[13px] font-circular px-8 py-1 rounded-md'>
                                                    Select
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='text-center font-circular font-normal text-gray-500'>
                                    No resumes found. Please create a resume first.
                                </div>
                            )}


                        </div>

                    </DialogContent>
                </Dialog>


                <div className='cursor-pointer' onClick={handleBack}>
                    <div style={{ outline: 'none', boxShadow: 'none' }} className='flex h-[60px]  items-center gap-3'>
                        <Logo size='115' />

                    </div>

                </div>



                <div className='flex items-center gap-4'>
                    {saveLoading ? (
                        <div className='flex items-center gap-2'>
                            <SlRefresh className='animate-spin' color='gray' />

                            <div className='font-circular text-gray-500 text-sm font-medium'>
                                Saving...
                            </div>
                        </div>
                    ) : unSaved ? (
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


                    < DropdownMenu >
                        <DropdownMenuTrigger>

                            <div className='flex border cursor-pointer text-sm px-4 py-1.5 border-primary-blue text-primary-blue font-circular font-medium rounded-md items-center gap-2'>
                                <HiOutlineUsers className='' />
                                <span className='hidden sm:block'>Share</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"w-[250px] fkex flex-col gap-6 font-circular mx-5"}>

                            <DropdownMenuItem onClick={handleSharing} className={`flex ${!sharing ? "!text-primary-blue !bg-gray-50" : ""}  items-center gap-2 `}>
                                <IoLockClosedOutline className={`size-5 ${!sharing ? "text-primary-blue" : ""}`} />
                                <div className='flex font-circular flex-col text-sm'>
                                    <div className=''>
                                        Sharing off
                                    </div>

                                    <div className='text-xs'>
                                        Only you can see this resume
                                    </div>
                                </div>
                            </DropdownMenuItem>


                            <DropdownMenuItem className={`flex ${sharing ? " !bg-gray-50" : ""} !bg-gray-50 items-start flex-col gap-3`}>
                                <div onClick={handleSharing} className={"flex items-center gap-2"}>
                                    <HiOutlineUsers className={`size-5 ${sharing ? "text-primary-blue" : ""}`} />
                                    <div className={`flex font-circular flex-col text-sm ${sharing ? "text-primary-blue" : ""}`}>
                                        <div className=''>
                                            Sharing on
                                        </div>

                                        <div className='text-xs'>
                                            Anyone with the link can view
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled={!sharing}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(
                                            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/resume/${fullResume?.public_id}/share`
                                        );
                                        toast.success("Link copied to clipboard");
                                    }}
                                    className="p-2 justify-center mx-auto font-circular font-medium flex items-center gap-2 rounded-md border-black/30 border"
                                >
                                    <FiLink />
                                    Copy link to share
                                </button>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>




                    <button disabled={saveLoading} onClick={download} className='hidden cursor-pointer sm:flex border text-sm px-4 py-1.5 bg-primary-blue text-white font-circular font-medium rounded-md items-center gap-2'>
                        <MdOutlineFileDownload className='size-4' />
                        Export
                    </button>



                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className='flex border text-sm px-2 py-1.5 bg-white  text-primary-blue border-primary-blue font-circular font-medium rounded-md items-center gap-2'>
                                <IoMenu className='size-4' />
                                <span className='sm:block hidden'>Menu</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"w-[200px] fkex flex-col gap-4 font-circular mx-5"}>

                            <DropdownMenuItem onClick={handleRedirect}>
                                <Plus />
                                Create Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenDialog(!openDialog)}>
                                <IoMdSearch />
                                Search Resumes
                            </DropdownMenuItem>

                            {fullResume?.primary ? (
                                <DropdownMenuItem disabled className={"hover:bg-primary-lighter duration-300 py-2"}>
                                    <IoMdTrash />
                                    Delete Resume
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => setOpen(!open)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                    <IoMdTrash />
                                    Delete Resume
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem className={"sm:hidden block"}>
                                <MdOutlineFileDownload />
                                Download Resume
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>




            </div>
        </div >

    )
}

export default EditorHeader