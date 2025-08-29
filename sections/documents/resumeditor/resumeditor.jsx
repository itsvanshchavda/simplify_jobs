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
import Loader from '@/components/loader'
import Link from 'next/link'
import { FaCheckCircle, FaWrench } from 'react-icons/fa'
import { Label } from '@/components/ui/label'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import GeAllJobsApi from '@/apis/job/GeAllJobsApi'
import { BsStars } from 'react-icons/bs'
import matchscore from './matchscore'
import matchScore from './matchscore'
import LogoWhite from '@/public/icons/logowhite'
import CustomizeResumeApi from '@/apis/resume/CustomizeResumeApi'
import { Info } from 'lucide-react'
import ResumeMatch from './resumematch'

const ResumeEditor = () => {
    const [resume, setResume] = useState(null)
    const [matchDialog, setMatchDialog] = useState(false)

    const [fullResume, setFullResume] = useState(null)
    const params = useSearchParams();
    const resumeId = params.get('id');
    const effectRun = useRef(false)
    const [filename, setFileName] = useState(fullResume?.filename || "")
    const [updateLoading, setUpdateLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [resumeCopy, setResumeCopy] = useState(null)
    const [openJobDialog, setOpenJobDialog] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null)
    const [jobs, setJobs] = useState([])
    const [resumeMatch, setResumeMatch] = useState(null)
    const [customizeLoading, setCustomizeLoading] = useState(false)
    const [loadingStep, setLoadingStep] = useState(0)

    const loadingSteps = [
        "Understanding the job description…",
        "Analyzing your experience…",
        "Highlighting key skills…",
        "Tailoring to the job…",
        "Optimizing for ATS…",
        "Formatting your resume…",
        "Finalizing your resume…",
    ];


    useEffect(() => {
        if (customizeLoading) {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i < loadingSteps.length) {
                    setLoadingStep(i);
                }
            }, 4000); // move to next step every 4 seconds

            return () => clearInterval(interval);
        } else {
            setLoadingStep(0); // reset for next upload
        }
    }, [customizeLoading]);



    useEffect(() => {
        if (resumeCopy && resume) {
            const hasChanges =
                JSON.stringify(resumeCopy) !== JSON.stringify(resume) ||
                filename !== fullResume?.filename;
            setHasUnsavedChanges(hasChanges);
        }
    }, [resume, resumeCopy, filename, fullResume?.filename]);


    const getResume = async () => {

        setLoading(true)

        const res = await GetResumeById(resumeId)

        if (res.error) {
            setLoading(false)
            toast.error(res.error)
            return
        }

        setResumeCopy(JSON.parse(JSON.stringify(res?.resume?.json)))
        setLoading(false)
        setFullResume(res?.resume)
        setResume(res?.resume?.json)
        setFileName(res?.resume?.filename)


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


    const handleSave = async () => {
        setSaveLoading(true)
        const res = await UpdateResumeApi({ json: resume, resumeId })


        if (res.error) {
            setSaveLoading(false)
            toast.error(res.error)
            return
        }

        toast.success("Resume updated successfully")
        setResumeCopy(JSON.parse(JSON.stringify(res?.resume?.json)))
        setFullResume(res?.resume)
        setResume(res?.resume?.json)
        setSaveLoading(false)
    }


    const getMatchScore = () => {
        if (!selectedJob || !resume) return;

        const scoreData = matchScore(selectedJob?.skills, resume?.allSkills);
        setResumeMatch(scoreData)
    }


    const getSaveJobs = async () => {
        const res = await GeAllJobsApi()

        if (res.error) {
            toast.error(res.error)
            return
        }
        setJobs(res?.jobs || [])
    };

    useEffect(() => {
        getMatchScore()
    }, [selectedJob, fullResume, resume])

    useEffect(() => {
        if (openJobDialog) {
            getSaveJobs()
        }
    }, [openJobDialog])


    const handleCustomize = async () => {

        setOpenJobDialog(false)


        if (!selectedJob) {
            toast.error("Please select a job to customize")
            return
        }


        setCustomizeLoading(true)

        const body = {
            job_title: selectedJob?.job_title,
            description: selectedJob?.description,
            job_skills: selectedJob?.skills,
            customjson: resume,
        }
        const res = await CustomizeResumeApi(body)
        console.log("🚀 ~ handleCustomize ~ res:", res)
        if (res.error) {
            setCustomizeLoading(false)
            toast.error(res.error)
            return
        }

        toast.success("Resume customized successfully")
        setResume(res?.resume)
        setCustomizeLoading(false)

    };




    if (loading) {
        return (
            <Loader />
        )
    }







    return (
        <div className="min-h-screen">


            <Dialog open={openJobDialog} onOpenChange={setOpenJobDialog}>
                <span />
                <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                    <DialogHeader>
                        <div className='flex items-center gap-2'>

                            <div className='p-2.5 rounded-full bg-primary-lighter/50'>
                                <FaWrench className="w-6 h-6 text-primary-blue" />
                            </div>
                            <DialogTitle className="font-circular font-semibold">
                                Tailor your resume to a job
                            </DialogTitle>

                        </div>
                        <div className='font-circular text-gray-600 text-sm'>
                            Add or edit the job title and description to customize the resume to a specific job posting.


                        </div>

                    </DialogHeader>


                    <div className='font-circular flex flex-col gap-4 w-full'>
                        <div className='flex flex-col gap-2'>
                            <Label>
                                Select a job from tracker
                            </Label>


                            <Select
                                value={selectedJob?._id || ""}
                                onValueChange={(value) => {
                                    const selected = jobs.find((j) => j._id === value);
                                    setSelectedJob(selected);
                                }}
                            >
                                <SelectTrigger className="w-full !h-11">
                                    <SelectValue placeholder="Select Job" />
                                </SelectTrigger>

                                <SelectContent className="z-[200]">
                                    {jobs.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            No saved jobs found
                                        </div>
                                    ) : (
                                        jobs.map((job) => (
                                            <SelectItem
                                                key={job._id}
                                                value={job._id}
                                                className="!bg-gray-50"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img className="size-8" src={job?.company_logo} alt="" />
                                                    <div className="font-circular font-medium line-clamp-1">
                                                        {job?.job_title}
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>






                        </div>

                        {selectedJob && (
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    Job Title
                                </Label>



                                <input
                                    name='job_title'
                                    onChange={(e) => setSelectedJob({ ...selectedJob, job_title: e.target.value })}
                                    value={selectedJob?.job_title || ""}
                                    type="text"
                                    placeholder="e.g. Software Engineer"
                                    className="p-3 font-circular h-11 w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"

                                />


                                <textarea
                                    style={{ resize: "none" }}
                                    name='job_description'
                                    value={selectedJob?.description || ""}
                                    placeholder='Job Description'
                                    className="p-3 font-circular min-h-[200px] w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"
                                    onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                                />


                            </div>
                        )}



                        <div className="flex gap-2">
                            <button onClick={() => setOpenJobDialog(false)} className='w-full border rounded-md p-2'>
                                Looks Good!
                            </button>

                            <button onClick={handleCustomize} className='w-full bg-primary-blue flex items-center gap-2 justify-center text-white border rounded-md p-2'>
                                <BsStars />
                                AI Generate All
                            </button>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>


            <ResumeMatch open={matchDialog} setOpen={setMatchDialog} matchScore={resumeMatch} />

            <EditorHeader unSaved={hasUnsavedChanges} savedtime={fullResume?.updatedAt} handleSave={handleSave} saveLoading={saveLoading} fullResume={fullResume} setFullResume={setFullResume} />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <span />
                <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                    <DialogHeader>
                        <DialogTitle className="font-circular font-semibold">
                            Edit Filename
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
                        autoFocus
                        value={filename}
                        onChange={(e) => setFileName(e.target.value)}
                        className="p-3 font-circular h-10 w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenDialog(!openDialog)}
                            className="w-full border py-2 rounded-md px-4 font-circular"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdateFilename}
                            className="w-full flex items-center justify-center gap-2 bg-primary-blue text-white py-2 px-4 rounded-md font-circular"
                        >
                            {updateLoading && <AiOutlineLoading className="animate-spin w-4 h-4" />}
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Mobile Tabs (show only on small screens) */}
            <div className="xl:hidden">
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

                    <TabsContent value="edit" className="p-4">
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

                            <div className='bg-white p-4 rounded-md border border-gray-200'>
                                {selectedJob ? (
                                    <div className="flex lg:flex-row flex-col gap-2 items-start lg:items-center justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <FaCheckCircle className="w-4 h-4 text-teal-500" />
                                                <div className="font-circular text-gray-500 text-sm">
                                                    Resume tailored to job
                                                </div>
                                            </div>
                                            <div className="font-circular line-clamp-1 text-black font-medium">
                                                {selectedJob?.job_title}
                                            </div>
                                        </div>

                                        <div className='flex  items-center gap-2'>
                                            <button onClick={() => setOpenJobDialog(!openJobDialog)} className=" border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                                Edit Job
                                            </button>


                                            <button onClick={handleCustomize} className="flex items-center gap-2  bg-primary-blue text-white font-circular px-4 py-2 rounded-md text-sm w-fit">

                                                <BsStars />

                                                AI Generate
                                            </button>
                                        </div>
                                    </div>
                                ) : (
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
                                        <button onClick={() => setOpenJobDialog(!openJobDialog)} className="mt-2 border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                            Tailor to Job
                                        </button>
                                    </div>
                                )}
                            </div>

                            <ResumeForm setResume={setResume} resume={resume} />
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="p-4 overflow-y-auto max-h-full">
                        <div className="w-full  bg-gray-50">
                            <div className="relative flex flex-col gap-4 w-full mx-auto max-w-[43rem] ">
                                {resumeMatch && (

                                    <div className='grid sticky top-0 z-10 grid-cols-4 gap-0'>
                                        <div className='p-4 w-full col-span-3 py-2 rounded-r-none rounded-md bg-primary-blue'>
                                            <div className='flex items-center justify-between'>
                                                <div className='sm:block hidden'>
                                                    <LogoWhite />
                                                </div>


                                                <div className='font-circular flex flex-col sm:items-end text-2xl text-white font-semibold'>
                                                    0 of 17 keywords
                                                    <div className='text-sm font-circular font-normal text-white'>
                                                        are present in your resume
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='p-4 py-2 border rounded-l-none rounded-md bg-white'>
                                            <div className='font-circular text-primary-blue flex flex-col justify-center items-center text-2xl'>
                                                0%
                                            </div>
                                            <div className='text-sm font-circular font-normal text-primary-blue text-center'>
                                                Resume Match
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Resume Content - with proper spacing from sticky header */}
                                <div className={`relative col-span-1 bg-white border-[20px] border-primary-lighter overflow-y-auto ${resumeMatch ? "h-[calc(100vh-270px)]" : "h-[calc(100vh-110px)]"}`}>

                                    <ResumeTemplate1 userResume={resume} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Desktop Layout (show only on large screens) */}
            <div className="hidden xl:flex h-[calc(100vh-62px)]">
                {/* Left Side - Edit Form */}
                <div className="w-1/2 overflow-y-auto border-r">
                    <div className="p-6 space-y-6">
                        <Link href={"/dashboard/documents"} className="flex cursor-pointer items-center gap-2 text-gray-500 font-circular">
                            <HiArrowLongLeft className="w-5 h-5" />
                            Documents
                        </Link>

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


                            {selectedJob ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <FaCheckCircle className="w-4 h-4 text-teal-500" />
                                            <div className="font-circular text-gray-500 text-sm">
                                                Resume tailored to job
                                            </div>
                                        </div>
                                        <div className="font-circular line-clamp-1 text-black font-medium">
                                            {selectedJob?.job_title}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => setOpenJobDialog(!openJobDialog)} className=" border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                            Edit Job
                                        </button>


                                        <button onClick={handleCustomize} className="flex items-center gap-2  bg-primary-blue text-white font-circular px-4 py-2 rounded-md text-sm w-fit">

                                            <BsStars />

                                            AI Generate
                                        </button>
                                    </div>
                                </div>
                            ) : (
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
                                    <button onClick={() => setOpenJobDialog(!openJobDialog)} className="mt-2 border border-primary-blue text-primary-blue font-circular px-4 py-2 rounded-md text-sm w-fit">
                                        Tailor to Job
                                    </button>
                                </div>
                            )}
                        </div>

                        <ResumeForm setResume={setResume} resume={resume} />
                    </div>
                </div>

                {/* Right Side - Preview */}
                <div className="w-1/2 pt-8 bg-gray-50">
                    <div className="w-[34rem] relative flex flex-col gap-4 mx-auto 3xl:w-[43rem]">
                        {resumeMatch && (

                            <div onClick={() => setMatchDialog(!matchDialog)} className='grid cursor-pointer sticky top-0 z-10 grid-cols-4 gap-0'>
                                <div className='p-4 w-full col-span-3 py-4 rounded-r-none rounded-md bg-primary-blue'>
                                    <div className='flex items-center justify-between'>
                                        <LogoWhite />
                                        <div className='font-circular flex flex-col items-end text-2xl text-white font-semibold'>
                                            {`${resumeMatch?.matchedKeywords} of ${resumeMatch?.totalKeywords} keywords`}
                                            <div className='text-sm font-circular font-normal text-white'>
                                                are present in your resume
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-4 py-4 border rounded-l-none rounded-md bg-white'>
                                    <div className='font-circular text-primary-blue flex flex-col justify-center items-center text-2xl'>
                                        {resumeMatch?.resumeMatch}
                                    </div>
                                    <div className='text-sm font-circular font-normal text-primary-blue text-center'>
                                        Resume Match
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Resume Content - with proper spacing from sticky header */}
                        <div className={`relative col-span-1 bg-white border-[20px] border-primary-lighter overflow-y-auto ${resumeMatch ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-110px)]"}`}>

                            {customizeLoading ? (
                                <div className="flex font-circular flex-col h-full items-center justify-center gap-4 sm:gap-6 px-4 py-6 text-center">
                                    {/* Loader */}
                                    <div className="w-[90%] max-w-xl h-[4px] rounded-full bg-gray-200 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full rounded-full bg-primary-light animate-loader"></div>
                                    </div>

                                    {/* Main Text */}
                                    <div className="text-2xl font-medium text-black font-matter">
                                        {loadingSteps[loadingStep]}
                                    </div>

                                    {/* Info Text with Icon */}
                                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-normal text-black font-matter">
                                        <Info className="w-4 h-4 text-black shrink-0" />
                                        <span>It usually takes 10–15 seconds to complete.</span>
                                    </div>
                                </div>
                            ) : (
                                <ResumeTemplate1 userResume={resume} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResumeEditor