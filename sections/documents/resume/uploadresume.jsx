"use client";
import AddResumeApi from '@/apis/resume/AddResumeApi';
import React, { useCallback, useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadIcon from '@/public/icons/upload';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import FileIcon from '@/public/icons/fileicon';
import { Button } from '@/components/ui/button';
import { MdArrowRightAlt } from 'react-icons/md';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const UploadResume = ({ open, setOpen, setResumes, resumes }) => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [uploadProgress, setUploadProgress] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const router = useRouter();


    const loadingSteps = [
        "Uploading your resume…",
        "Parsing your resume…",
        "Understanding your skills…",
        "Almost there…",
    ];


    const handleSubmit = async () => {
        if (!file) {
            setError("Please select a file to upload");
            return;
        }

        setLoading(true);
        setError("");

        const res = await AddResumeApi(file, "no")

        if (res.error) {
            setError(res.error);
            setLoading(false);
            setUploadProgress("");
            return;
        }

        // Reset states after successful upload
        setFile(null);
        setLoading(false);
        setUploadComplete(true);

        setOpen(false);


        // Update resumes list
        setTimeout(() => {
            setResumes([...resumes, res?.resume]);
        }, 1500);

        toast.success(`${res?.resume}`)



    }


    const handleFileChange = useCallback((e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("File size must not exceed 10MB");
            return;
        }

        setError("");
        setFile(selectedFile);
        setUploadProgress("Uploading...");

        // Simulate upload completion
        setTimeout(() => {
            setUploadProgress("Upload Completed");
        }, 2000); // 2 seconds or your preferred time
    }, []);


    useEffect(() => {
        if (loading) {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i < loadingSteps.length) {
                    setLoadingStep(i);
                }
            }, 2000); // move to next step every 2 seconds

            return () => clearInterval(interval);
        } else {
            setLoadingStep(0); // reset for next upload
        }
    }, [loading]);


    const handleRedirect = () => {
        router.push('/dashboard/resume/new')
    }


    return (


        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger clasname="hidden">
                <span />
            </DialogTrigger>
            <DialogContent className="w-[95%] flex flex-col gap-8  !max-w-[45rem] pt-10 mx-auto border-none outline-none p-4 rounded-xl" zIndex={100}>
                <DialogHeader className={"hidden"}>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>

                </DialogHeader>




                <div className='flex  items-center gap-4'>


                    <div className='p-2 bg-primary-lighter/50 rounded-full'>
                        <FileIcon />
                    </div>

                    <div className='flex flex-col'>
                        <div className='font-circular tracking-wide text-sm sm:text-lg font-medium'>
                            Upload Resume


                        </div>


                    </div>
                </div>


                <div className='flex flex-col gap-4'>
                    <div className='flex  flex-col gap-8'>
                        <div className='bg-white mx-4 p-4 flex flex-col justify-center items-center border-dashed border-2 border-gray-300 py-6 rounded-md relative'>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            <div className='flex flex-col items-center justify-center gap-1 pointer-events-none'>
                                <div>
                                    {loading ? (
                                        <Loader2 className='animate-spin w-8 h-8 text-primary-blue' />
                                    ) : uploadComplete ? (
                                        <Image alt='tick' src="/images/tick.png" width={35} height={35} />
                                    ) : (
                                        <UploadIcon className='size-12 sm:w-full sm:h-full ' />
                                    )}
                                </div>

                                {/* Upload text */}
                                <div className='flex items-center gap-2'>
                                    <div className='font-medium max-w-[600px] truncate text-xs sm:text-base text-center font-circular text-primary-blue'>
                                        {!loading ? (
                                            !loadingSteps[loadingStep]
                                        ) : uploadComplete ? (
                                            "Upload Completed"
                                        ) : file ? (
                                            file.name
                                        ) : (
                                            "Click to upload or drag and drop"
                                        )}
                                    </div>


                                </div>

                                {/* Helper text */}
                                <div className='font-circular text-center text-xs sm:text-sm text-gray-400 tracking-wide'>
                                    {error ? (
                                        <span className='text-red-500'>{error}</span>
                                    ) : uploadProgress === "Upload Completed" ? (
                                        "Your resume is being uploaded successfully"
                                    ) : (
                                        "PDF or Word document (max 10MB)"
                                    )}
                                </div>
                            </div>


                        </div>

                        <Button disabled={loading} onClick={handleSubmit} className={"w-[250px] mx-auto hover:bg-cyan-600 duration-300 bg-primary-blue text-white h-10 text-sm sm:text-base font-medium font-circular "}>

                            {loading ? (
                                "Loading..."
                            ) : (
                                "Upload Resume"
                            )}

                        </Button>


                    </div>

                    <button disabled={loading} onClick={handleRedirect} className="flex cursor-pointer items-center text-primary-blue justify-center gap-2">
                        <div className='text-center text-sm font-circular'>
                            Or easily Tailor for Any Job, ATS Friendly

                        </div>

                        <MdArrowRightAlt />

                    </button>
                </div>
            </DialogContent>
        </Dialog >


    )

}

export default UploadResume