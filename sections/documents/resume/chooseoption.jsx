"use client"

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useRef, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import toast from 'react-hot-toast';
import GetAllResume from '@/apis/resume/GetAllResume';
import { FiFileText } from "react-icons/fi";
import { MdRemoveRedEye } from 'react-icons/md';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FileIcon from '@/public/icons/fileicon';
import { FaFileImport } from "react-icons/fa6";
import ResumeFromScratch from '@/apis/resume/ResumeScratchApi';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading } from 'react-icons/ai';
import SaveResumeApi from '@/apis/resume/SaveResumeApi';




const ChooseOption = () => {
    const [step, setStep] = useState(1);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const effectRun = useRef(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const [search, setSearch] = useState("")
    const [filteredResumes, setFilteredResumes] = useState([])
    const router = useRouter()
    const [resumeScratchLoading, setResumeScratchLoading] = useState(false);
    const [baseResumeLoading, setBaseResumeLoading] = useState(false);

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


    const handleOpenPreview = (resume) => {
        setSelectedResume(resume)
        setOpenPreview(!openPreview)
    };


    const handleScratchResume = async () => {
        setResumeScratchLoading(true)


        const res = await ResumeFromScratch();

        if (res.error) {
            toast.error(res.error)
            setResumeScratchLoading(false)

            return
        }

        if (res.resume?._id) {
            setResumeScratchLoading(false)
            toast.success("Your resume is created successfully!!")
            router.push(`/dashboard/resume/editor?id=${res?.resume?._id}`)
        }


    }


    const handleBaseResume = async (resume) => {
        setBaseResumeLoading(true)

        const body = {
            filename: resume?.filename + "_scratch",
            json: resume?.json,
            resume_type: 1,

        }
        const res = await SaveResumeApi(body);

        if (res.error) {
            setBaseResumeLoading(false)
            toast.error(res.error)
            return


        }

        if (res.resume?._id) {
            setBaseResumeLoading(false)
            toast.success("Your resume is created successfully!!")
            router.push(`/dashboard/resume/editor?id=${res?.resume?._id}`)
        }

    }





    return (
        <div className='w-full xl:px-0 flex flex-col p-6 pb-20'>

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
                        src={`https://docs.google.com/gview?url=${selectedResume?.url}&embedded=true`}
                        width="100%"
                        height="600"
                        style={{ border: "none" }}
                    />




                </DialogContent>
            </Dialog>

            <div className='bg-white  rounded-md mx-auto flex flex-col gap-5  max-w-[65rem]  py-5 xl:py-10 w-full'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='font-circular   font-medium text-xl sm:text-3xl'>
                        How would you like to create this new resume?

                    </div>

                    <div className='font-circular sm:text-base text-sm font-normal text-gray-700'>
                        Use an existing resume as base or start from your profile information.

                    </div>
                </div>

                <div className='flex items-center justify-center flex-col gap-8'>
                    <div className='w-full mx-auto max-w-4xl border  rounded-md p-4'>
                        <div onClick={handleScratchResume} className="flex cursor-pointer flex-col gap-1">
                            {resumeScratchLoading ? (
                                <div className="flex flex-col gap-1 animate-pulse">
                                    <div className="flex items-center gap-2">
                                        <AiOutlineLoading className="text-primary-blue animate-spin opacity-50" />
                                        <div className="font-circular font-medium text-gray-400">
                                            Loading...
                                        </div>
                                    </div>
                                    <div className="font-circular  text-gray-400">
                                        Please wait while we create your resume.
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2">
                                        <FaRegEdit className="text-primary-blue" />
                                        <div className="font-circular font-medium">
                                            Start from scratch
                                        </div>
                                    </div>

                                    <div className="font-circular font-medium text-gray-600">
                                        Start from scratch resume using our resume builder.
                                    </div>
                                </>
                            )}
                        </div>






                    </div>

                    <div className="flex w-[200px]  justify-center items-center">
                        <Separator className="flex-1" />
                        <span className="px-2 text-gray-400 font-circular font-light text-base">OR</span>
                        <Separator className="flex-1" />
                    </div>



                    <div className='w-full mx-auto max-w-4xl border  rounded-md p-4'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-2'>
                                    <FaFileImport className='text-primary-blue' />
                                    <div className='font-circular font-medium'>
                                        Use Existing Resume


                                    </div>


                                </div>
                                <div>
                                    <div className='font-circular font-medium text-gray-600'>
                                        Choose a resume (default user details are included)
                                    </div>


                                </div>





                            </div>



                            <div className='flex flex-col px-[1rem] gap-6'>

                                <div>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by name "
                                        className="p-3 font-circular border text-base border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 h-10 block w-full rounded-sm leading-5 text-secondary-400  transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-4  disabled:bg-[#F2F2F2] disabled:opacity-90"



                                    />
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

                                                    <button onClick={() => handleBaseResume(resume)} className='bg-gray-100 text-gray-600  text-[13px] font-circular px-8 py-1 rounded-md'>
                                                        {baseResumeLoading ? (<div>

                                                            <AiOutlineLoading className='animate-spin text-primary-blue inline ' />
                                                        </div>) : "Select"}

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





                        </div>





                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChooseOption