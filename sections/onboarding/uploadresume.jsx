"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/public/icons/logo'
import clsx from 'clsx'
import React, { useCallback, useEffect, useState } from 'react'
import mag from '@/public/images/mag.png'
import Image from 'next/image'
import UploadIcon from '@/public/icons/upload'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, FileText, Info, Loader2, X } from 'lucide-react'
import { useUser } from '@/context/userContext'
import toast from 'react-hot-toast'
import AddResumeApi from '@/apis/resume/AddResumeApi'
import UpdateUserApi from '@/apis/user/UpdateUser'
import { useRouter } from 'next/navigation'


const UploadResume = () => {

    const { state, dispatch } = useUser();
    const user = state.user;

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();
    const loadingSteps = [
        "Uploading your resume…",
        "Parsing your resume…",
        "Filling in your profile…",
        "Understanding your skills…",
        "Almost there…",
    ];

    const [loadingStep, setLoadingStep] = useState(0);
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



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please upload a resume file.");
            return;
        }

        try {
            setLoading(true);

            // Upload resume
            const res = await AddResumeApi(file, "yes");
            if (res.error) {
                toast.error(res.error);
                return;
            }

            // Update user info
            const userRes = await UpdateUserApi({ firstName, lastName, onboardingStep: 1 });
            if (userRes.error) {
                toast.error(userRes.error);
                return;
            }

            // Success
            toast.success("Resume uploaded successfully!");
            setUploadComplete(true);

            dispatch({ type: "SET_USER", payload: userRes })

            router.push("/onboarding/job-resume");

        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false); // ensure loading is reset in all cases
        }
    };



    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

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



    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">

            {/* Header */}
            <div className="mx-auto pt-[1rem] w-full px-[1rem]  max-w-7xl flex justify-between items-center">
                <Logo />
                <div onClick={handleLogout} className="font-circular cursor-pointer uppercase text-base text-gray-500 font-normal">
                    SIGN OUT
                </div>
            </div>

            {/* Centered box */}
            <div className="flex-1 xl:px-0  px-[1rem] flex gap-5 items-center md:items-start md:py-10 xl:items-center xl:py-0 justify-center ">



                <div className="bg-white  px-[1rem] flex flex-col items-center justify-center h-full gap-6 py-5 xl:py-10 max-w-6xl w-full  rounded-2xl" >


                    <div className="flex items-center gap-4 w-full md:w-[400px] xl:w-[520px]">
                        {/* Back Button */}
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-1 text-gray-700 "
                        >
                            <ArrowLeft size={18} />
                            <span className="text-sm uppercase font-circular text-gray-600 font-medium">Back</span>
                        </button>

                        {/* Progress bar */}
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-primary-blue rounded-full"
                                style={{ width: `${50}%` }}
                            />
                        </div>

                        {/* Percentage */}
                        <span className="text-sm font-circular text-primary-blue font-medium">{50}%</span>
                    </div>
                    <div className='font-circular font-medium text-2xl xl:text-3xl px-[1rem] text-center'>
                        Great! Time to show off your amazing resume.

                    </div>

                    <div className='max-w-3xl flex flex-col gap-6 mx-auto w-full px-[1rem]'>
                        <div className='grid sm:grid-cols-2 gap-4'>
                            {/* First Name */}
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>First Name</Label>
                                <input
                                    disabled={loading}
                                    placeholder="First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={clsx(
                                        "p-3 font-circular border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",

                                    )}
                                />


                            </div>

                            {/* Last Name */}
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>Last Name</Label>
                                <input
                                    disabled={loading}
                                    placeholder="Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={clsx(
                                        "p-3 font-circular border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",

                                    )}
                                />

                            </div>
                        </div>


                        <div className='flex flex-col gap-6'>
                            <div className='font-circular text-lg font-medium'>
                                Upload Resume
                            </div>


                            <div className=' hidden xl:flex bg-gray-50 p-4 rounded-lg  items-center gap-4'>

                                <Image src={mag} alt={"search"} width={20} height={20} />

                                <div className='flex flex-col gap-2'>
                                    <div className='font-circular text-gray-700 font-[400] text-[1rem]'>
                                        We'll parse your resume and use it to prefill your profile information.
                                        <br />

                                        PDFs are recommended for best results when submitting job applications.
                                    </div>


                                    <div className='font-circular italic text-gray-700 font-[400] text-[1rem]'>
                                        We protect your privacy and will never share your resume with employers.
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white p-4 flex flex-col justify-center items-center border-dashed border-2 border-gray-300 py-6 rounded-md relative'>
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
                                            <UploadIcon className='w-8 h-8 text-gray-500' />
                                        )}
                                    </div>

                                    {/* Upload text */}
                                    <div className='flex items-center gap-2'>
                                        <div className='font-medium max-w-[600px] truncate text-center font-circular text-primary-blue'>
                                            {uploadProgress && uploadProgress !== "Upload Completed"
                                                ? uploadProgress // show "Uploading..." or progress
                                                : loading && loadingSteps[loadingStep]
                                                    ? loadingSteps[loadingStep] // show current loading step if any
                                                    : uploadProgress === "Upload Completed"
                                                        ? file.name // show file name when done
                                                        : "Click to Upload Resume"}

                                        </div>
                                    </div>

                                    {/* Helper text */}
                                    <div className='font-circular text-center text-sm text-gray-400 tracking-wide'>
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




                        </div>
                    </div>



                    <Button disabled={loading} onClick={handleSubmit} className={"w-[200px] hover:bg-cyan-600 duration-300 bg-primary-blue text-white h-10 text-base font-medium font-circular "}>

                        {loading ? (
                            "Loading..."
                        ) : (
                            "Get Started"
                        )}

                    </Button>
                </div>




            </div >
        </div >
    )
}

export default UploadResume
