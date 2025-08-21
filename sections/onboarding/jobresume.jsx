"use client"
import Logo from "@/public/icons/logo"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, MapPin, Clock, Building2, Users, CheckCircle, ExternalLink, Eye, EyeOff } from "lucide-react"
import { useUser } from "@/context/userContext"
import toast from "react-hot-toast"
import UpdateUserApi from "@/apis/user/UpdateUser"
import { useRouter } from "next/navigation"
import GetJobDataApi from "@/apis/job/GetJobDataApi"
import PlaceholderJobCard from "./placeholder"
import JobCard from "./jobcard"
import CustomizeResumeApi from "@/apis/resume/CustomizeResumeApi"
import SaveJobDataApi from "@/apis/job/SaveJobDataApi"
import UpdateDefaultResumeApi from "@/apis/resume/UpdateDefaultResumeApi"
import Image from "next/image"
import SaveResumeApi from "@/apis/resume/SaveResumeApi"

const JobResume = () => {
    const { state, dispatch } = useUser();
    const user = state?.user

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fetchingJob, setFetchingJob] = useState(false)
    const [currentJob, setCurrentJob] = useState(null)
    const [selectedJob, setSelectedJob] = useState(null)
    const [url, setUrl] = useState("")
    const [loadingStep, setLoadingStep] = useState(0)
    const router = useRouter()

    const loadingSteps = [
        "Uploading your resume…",
        "Analyzing your experience…",
        "Highlighting key skills…",
        "Tailoring to the job…",
        "Optimizing for ATS…",
        "Formatting your resume…",
        "Finalizing your resume…",
    ];


    useEffect(() => {
        if (loading) {
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
    }, [loading]);






    const getJobDetails = async (e) => {
        e.preventDefault();
        if (!url.trim()) return toast.error("Please enter a valid job URL");

        try {
            setFetchingJob(true);
            const res = await GetJobDataApi({ url: url.trim() });
            if (res.error) return toast.error(res.error);

            setCurrentJob(res.job);

            toast.success("Job details fetched successfully!");
        } catch (err) {
            toast.error("Failed to fetch job details.");
        } finally {
            setFetchingJob(false);
        }
    };



    const handleSelectJob = async () => {
        try {
            const res = await SaveJobDataApi({ jobData: currentJob, isDefaultJob: true })
            if (res.error) {
                toast.error(res.error)
                return
            }

            setCurrentJob(res.job)      // update current job with _id
            setSelectedJob(res.job)     // mark it as selected

            console.log("Job data saved successfully:", res.job)

            const userRes = await UpdateUserApi({
                default_job: res.job._id,
            })

            if (userRes.error) {
                toast.error(userRes.error)
                return
            }

            dispatch({ type: "SET_USER", payload: userRes })
            console.log("User updated with default job:", userRes)
            toast.success("Job selected! Ready to customize your resume.")
        } catch (err) {
            toast.error("Something went wrong while selecting job.")
            console.error(err)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedJob) {
            toast.error("Please select a job first")
            return
        }

        try {
            setLoading(true)

            const body = {
                job_title: selectedJob?.job_title,
                description: selectedJob?.description,
                job_skills: selectedJob?.skills,
            }

            const res = await CustomizeResumeApi(body)

            if (res.error) {
                toast.error(res.error)
                return
            }

            console.log("Resume customized successfully:", res)


            const saveRes = await SaveResumeApi({
                filename: `${user?.firstName}-${user?.lastName}-customized-resume`,
                json: res.parsedResume,
                resume_type: 1,
                job_id: selectedJob?._id,

            })

            if (saveRes.error) {
                toast.error(saveRes.error)
                return
            }
            console.log("Resume saved successfully:", saveRes)


            const resumeRes = await UpdateDefaultResumeApi({ resumeId: saveRes.resume._id })

            if (resumeRes.error) {
                toast.error(resumeRes.error)
                return
            }

            toast.success("Resume customized and default resume updated successfully!")

            const userRes = await UpdateUserApi({
                onboardingStep: 2,
            });

            if (userRes.error) {
                toast.error(userRes.error);
                return;
            }


            router.push("/onboarding/application-kit");

        } catch (err) {
            toast.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }





    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="mx-auto pt-4 w-full px-4 max-w-7xl flex justify-between items-center">
                <Logo />
                <div
                    onClick={handleLogout}
                    className="font-circular cursor-pointer uppercase text-base text-gray-500 font-normal hover:text-gray-700 transition-colors duration-200"
                >
                    SIGN OUT
                </div>
            </div>

            {/* Centered box */}
            <div className="flex-1 xl:px-0 px-4 flex gap-5 items-center md:items-start md:py-10 xl:items-center xl:py-0 justify-center">
                <div className="bg-white  px-4 flex flex-col items-center justify-center h-full gap-6 py-5 xl:py-10 max-w-6xl w-full rounded-2xl ">
                    <div className="flex items-center gap-4 w-full md:w-[400px] xl:w-[520px]">
                        {/* Back Button */}
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="text-sm uppercase font-circular text-gray-600 font-medium group-hover:text-gray-800">Back</span>
                        </button>

                        {/* Progress bar */}
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-primary-blue rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${70}%` }}
                            />
                        </div>

                        {/* Percentage */}
                        <span className="text-sm font-circular text-primary-blue font-medium">{70}%</span>
                    </div>

                    <div className="font-circular font-medium text-2xl xl:text-3xl  text-center leading-tight">
                        Let's customize your resume perfectly for job.
                    </div>

                    <div className="max-w-3xl flex flex-col gap-4 mx-auto w-full">
                        {!selectedJob ? (
                            <form onSubmit={getJobDetails} className="flex flex-col gap-6">

                                <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                                    <div className="flex w-full flex-col gap-2 font-circular">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://www.example.com/job-posting"
                                            className={clsx(
                                                "p-3 font-circular border text-base border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 h-12 block w-full rounded-sm leading-5 text-secondary-400 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:shadow-md disabled:bg-[#F2F2F2] disabled:opacity-90",
                                                error && "border-red-300 focus:border-red-500 focus:ring-red-500/10",
                                            )}
                                            disabled={fetchingJob}
                                        />
                                    </div>

                                    <Button

                                        type="submit"
                                        disabled={fetchingJob || !url.trim()}
                                        className="h-12  sm:w-[200px] w-full text-sm rounded-sm bg-white border-2 text-primary-blue duration-300 hover:bg-primary-blue hover:text-white font-circular font-medium border-primary-blue/60 disabled:opacity-50 hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                                    >
                                        {fetchingJob ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin" />
                                                Fetching...
                                            </div>
                                        ) : (
                                            "Fetch Job Post"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        ) : loading ? (
                            <div className=" font-circular inline-flex sm:items-center items-start justify-center gap-2 font-medium text-xl xl:text-2xl text-center  ">
                                <img
                                    src="/images/memo.png"
                                    alt="File"
                                    width={27}
                                    height={27}
                                    className=""
                                    loading="lazy"
                                />
                                <span className="text-center">
                                    {loadingSteps[loadingStep]}
                                </span>
                            </div>
                        ) : (
                            <div className=" font-circular inline-flex sm:items-center items-start justify-center gap-2 font-medium text-xl xl:text-2xl text-center  ">
                                <img
                                    src="/images/party-popper.png"
                                    alt="Party popper celebration icon"
                                    width={27}
                                    height={27}
                                    className=""
                                    loading="lazy"
                                />
                                <span className="text-center">
                                    Done! Just press <strong>Customize Resume</strong>.
                                </span>
                            </div>

                        )}

                        {/* Job Card or Placeholder */}
                        <div className="grid gap-4">
                            {currentJob ? (
                                <JobCard
                                    job={currentJob}
                                    selectedJob={selectedJob}
                                    handleSelectJob={handleSelectJob}
                                />) : (<PlaceholderJobCard />)}
                        </div>
                    </div>

                    <Button
                        disabled={loading || !selectedJob}
                        onClick={handleSubmit}
                        className="w-[200px] hover:bg-cyan-600 duration-300 bg-primary-blue text-white h-10 text-base font-medium font-circular disabled:opacity-50 hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                Loading...
                            </div>
                        ) : selectedJob ? (
                            "Customize Resume"
                        ) : (
                            "Select Job First"
                        )}
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default JobResume