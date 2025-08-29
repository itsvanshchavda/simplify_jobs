"use client"

import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FileIcon from '@/public/icons/fileicon'
import downloadPdf from '@/utils/downloadpdf'
import GetAllResume from '@/apis/resume/GetAllResume'
import toast from 'react-hot-toast'
import { FiFileText } from 'react-icons/fi'
import { HiPencil } from 'react-icons/hi2'
import { IoMdTrash } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import DeleteResumeApi from '@/apis/resume/DeleteResumeApi'
import DeletePopup from '../documents/resume/deletepopup'


import { MdOutlineArrowRightAlt, MdOutlineFileDownload, MdRemoveRedEye } from 'react-icons/md'
import { useUser } from '@/context/userContext'
import { RiPencilFill } from 'react-icons/ri'
import { PiFiles } from 'react-icons/pi'
import { AiOutlineLoading, AiOutlineUpload } from 'react-icons/ai'
import { TbFileText } from 'react-icons/tb'
import UploadResume from '../documents/resume/uploadresume'
import Link from 'next/link'
import MakeResumePrimaryApi from '@/apis/resume/MakeResumePrimary'


const ResumeSection = () => {

    const { state } = useUser()
    const router = useRouter()
    const user = state?.user
    const [resumes, setResumes] = useState(null)
    const [allResumes, setAllResumes] = useState([]); // for sorting 
    const [openPreview, setOpenPreview] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [search, setSearch] = useState("")
    const effectRun = useRef(false)
    const [loading, setLoading] = useState(false)
    const [selectedResume, setSelectedResume] = useState(null)
    const [deletePopup, setDeletePopup] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(true)

    const getTimeAgo = (timestamp) => {
        const postTime =
            typeof timestamp === "string"
                ? new Date(timestamp.replace(" ", "T"))
                : new Date(timestamp);

        if (isNaN(postTime.getTime())) return "";

        const day = postTime.getDate().toString().padStart(2, "0");
        const month = (postTime.getMonth() + 1).toString().padStart(2, "0");
        const year = postTime.getFullYear();

        let hours = postTime.getHours();
        const minutes = postTime.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // convert 0 to 12-hour format

        return `${day} / ${month} / ${year} , ${hours}:${minutes} ${ampm}`;
    };

    const deleteResume = async () => {


        setDeleteLoading(true)
        const res = await DeleteResumeApi(selectedResume?._id)

        if (res.error) {
            toast.error(res.error)
            setDeleteLoading(false)
            return;
        }

        setResumes((prevResumes) =>
            prevResumes.filter((resume) => resume._id !== selectedResume?._id)
        );

        toast.success("Resume deleted successfully")
        setDeletePopup(false)
        setDeleteLoading(false)
    }



    const getResumes = async () => {
        setLoading(true)
        const res = await GetAllResume();

        if (res.error) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setLoading(false)
        setAllResumes(res?.resumes)
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




    const handleDowload = async () => {
        await downloadPdf(selectedResume?.url, selectedResume?.filename);
    }



    const handleFilter = (items) => {


        return items.filter((item) =>
            item.filename.toLowerCase().includes(search.toLowerCase())
        );
    };



    useEffect(() => {
        let items = [...allResumes];

        if (search) {
            items = handleFilter(items);

        }

        setResumes(items);

    }, [search, allResumes]);


    const handleEdit = (id) => {
        setOpenDialog(false)
        router.push(`/dashboard/resume/editor?id=${id}`)

    }


    const handleOpenDelete = (item) => {
        setSelectedResume(item)
        setDeletePopup(!deletePopup)
    }


    const makeResumePrimary = async (resumeId) => {
        const res = await MakeResumePrimaryApi({ resumeId })

        if (res.error) {
            toast.error(res.error)
            return;
        }

        setResumes((prevResumes) =>
            prevResumes.map((resume) =>
                resume._id === resumeId
                    ? { ...resume, primary: true }
                    : { ...resume, primary: false }
            )
        );

        toast.success("Resume set as primary")
    }
    return (
        <div className='bg-white p-6 flex flex-col gap-4  max-w-hero h-fit rounded-md border border-gray-200'>
            <div className='flex justify-between items-center'>

                <div className='font-medium font-circular text-lg'>
                    Resume
                </div>




                {/* Upload Resume  */}

                <UploadResume open={openUpload} setOpen={setOpenUpload} resumes={resumes} setResumes={setResumes} />

                {/* Delete resume popup */}

                <DeletePopup open={deletePopup} setOpen={setDeletePopup} loading={deleteLoading} handleDelete={deleteResume} />

                {/* Update resume dialog  */}

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                    <DialogTrigger>

                        <div className='p-1.5 bg-gray-50 border border-gray-200 rounded-md'>
                            <RiPencilFill color='gray' />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] !max-w-[43rem] flex flex-col gap-5" zIndex={50}>
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
                            <div className="w-full md:flex-row gap-2 items-center flex-col flex">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Search by name"
                                    className="p-3 font-circular h-10 block w-full rounded-sm sm:rounded-l-sm text-sm leading-5 text-secondary-400 transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                                />
                                <div className="flex">

                                    <div onClick={() => {
                                        setOpenUpload(true)
                                        setOpenDialog(false)
                                    }} className="flex md:border-x-0 border-r-0 sm:rounded-none rounded-l-sm cursor-pointer border border-gray-200  h-10 px-10 items-center gap-2">
                                        <AiOutlineUpload color="gray" size={20} />
                                        <div className="font-circular text-sm font-normal text-gray-600">
                                            Upload
                                        </div>
                                    </div>

                                    <Link href={'/dashboard/resume/new'} className="flex border cursor-pointer  border-gray-200  h-10 px-7 rounded-r-sm items-center gap-2">
                                        <TbFileText color="gray" size={20} />
                                        <div className="font-circular text-sm font-normal text-gray-600">
                                            Generate
                                        </div>
                                    </Link>
                                </div>
                            </div>




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

                                                    <div className='font-circular line-clamp-1  truncate sm:text-base text-sm font-medium'>
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


                                            <div className="flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-3">
                                                    <MdRemoveRedEye
                                                        onClick={() => {
                                                            setSelectedResume(resume)
                                                            setOpenPreview(true)
                                                        }}
                                                        size={20}
                                                        className="cursor-pointer"
                                                        color="gray"
                                                    />
                                                    <HiPencil size={14} className='cursor-pointer' color="gray" onClick={() => handleEdit(resume?._id)} />
                                                    {!resume?.primary && <IoMdTrash className='cursor-pointer' onClick={() => handleOpenDelete(resume)} color="gray" />}
                                                </div>

                                                <div className="font-circular ">
                                                    {resume?.primary ? (
                                                        <div className="py-1 px-4 font-medium bg-primary-lighter/50  text-xs rounded-md text-primary-blue text-center min-w-[110px]">
                                                            Default
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => makeResumePrimary(resume?._id)} className="py-1 px-4 bg-gray-100 text-xs rounded-md cursor-pointer text-gray-600 text-center min-w-[110px]">
                                                            Set as default
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='text-center font-circular font-normal text-gray-500'>
                                    No resumes found
                                </div>
                            )}


                        </div>

                    </DialogContent>
                </Dialog>


            </div>

            <div className='flex items-center gap-4'>
                <div className='rounded-lg w-fit p-3 bg-gradient-to-r from-[#84BFF6] to-[#84DCF6]'>
                    <PiFiles className='size-8 text-white' />
                </div>
                <div className='flex justify-between items-center w-full'>

                    <div className='flex font-circular  flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='font-medium text-base'>
                                {user?.default_resume?.filename || 'No resume uploaded'}
                            </div>

                            <div className='bg-gray-200 text-black font-medium font-circular text-xs py-1 px-3 rounded-2xl'>
                                Default
                            </div>
                        </div>

                        <div className='text-sm text-gray-600 font-normal'>
                            Last updated {user?.default_resume ? getTimeAgo(user?.default_resume?.updatedAt) : 'N/A'}
                        </div>
                    </div>


                    {/* Preview Dialog */}
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
                                src={selectedResume?.url}
                                width="100%"
                                height="600px"
                                style={{ border: "none" }}
                                onLoad={() => setLoading(false)}
                            />


                            <button onClick={handleDowload} className='bg-primary-blue w-fit justify-center mx-auto flex items-center gap-2 hover:bg-cyan-600 text-white font-circular font-medium py-2 px-4 rounded-md '>

                                <MdOutlineFileDownload size={25} />
                                Download Resume
                            </button>



                        </DialogContent>
                    </Dialog>




                    <button onClick={() => {
                        setSelectedResume(user?.default_resume)
                        setOpenPreview(true)
                    }} className='bg-primary-blue hover:bg-cyan-600 text-white font-circular font-medium py-2 px-4 rounded-md text-sm'>
                        Preview Resume
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResumeSection
