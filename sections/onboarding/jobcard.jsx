"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MapPin, Clock, Building2, Users, CheckCircle, ExternalLink, Plus, X, BriefcaseBusiness, Briefcase, Layers, Award, Save, Bookmark } from "lucide-react"
import { useState } from "react"

const JobCard = ({ job, selectedJob, handleSelectJob }) => {
    console.log("🚀 ~ JobCard ~ selectedJob:", selectedJob)
    console.log("🚀 ~ JobCard ~ job:", job)




    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const maxDescriptionLength = 200
    const maxSkillsToShow = 4
    const shouldShowMoreSkills = job.skills && job.skills.length > maxSkillsToShow
    const visibleSkills = job.skills ? job.skills.slice(0, maxSkillsToShow) : []
    const remainingSkillsCount = job.skills ? job.skills.length - maxSkillsToShow : 0

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-4xl mx-auto shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex xl:hidden  md:flex-row flex-col items-start gap-4">
                    {job.company_logo && (
                        <div className="relative group">
                            <img
                                src={job.company_logo || "/images/placeholder.svg"}
                                alt="Company logo"
                                className="w-16 h-16 rounded-lg object-contain border border-gray-200 group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    )}
                    <div className="flex-1 relative">
                        <div className="flex gap-3 items-start justify-between ">
                            <button
                                onClick={() => setIsSheetOpen(true)}
                                className="text-left w-full group"
                            >
                                <h3 className="font-circular md:max-w-[400px] max-w-[200px] truncate font-semibold text-xl text-gray-900 pb-2 leading-tight group-hover:text-primary-blue transition-colors duration-200 cursor-pointer">
                                    {job.job_title}
                                </h3>
                            </button>


                            <div className="flex items-center gap-2">

                                {!selectedJob && (
                                    <button onClick={handleSelectJob}>
                                        <Bookmark
                                            size={22}
                                            className={`
                                            ${selectedJob && selectedJob._id === job._id ? "text-green-600" : "text-gray-500 hover:text-primary-blue transition-colors duration-200"}
                                            hover:scale-105 transition-transform duration-200`}
                                        />
                                    </button>
                                )}




                                <a href={job.job_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-blue transition-colors duration-200">
                                    <ExternalLink size={22} />

                                </a>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-600 pb-3">
                            <div className="flex items-center  gap-1 py-1 px-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-colors">
                                <span className="font-circular">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1 py-1 px-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-colors">
                                <span className="font-circular">{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-1 py-1 px-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-colors">
                                <span className="font-circular">{job.company_name}</span>
                            </div>
                            {job.job_type && job.job_type.length > 0 && (
                                <div className="flex items-center gap-1 py-1 px-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-colors">
                                    <span className="font-circular">{job.job_type.join(", ")}</span>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="hidden xl:block">
                    <div className="flex items-start gap-4 mb-4">
                        {job.company_logo && (
                            <div className="relative group">
                                <img
                                    src={job.company_logo || "/images/placeholder.svg"}
                                    alt="Company logo"
                                    className="w-16 h-16 rounded-lg object-contain border border-gray-200 group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 onClick={() => setIsSheetOpen(!isSheetOpen)} className="font-circular hover:text-primary-blue duration-300 cursor-pointer font-semibold text-xl text-gray-900 mb-2 leading-tight">{job.job_title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span className="font-circular">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                                    <Clock size={16} className="text-gray-400" />
                                    <span className="font-circular">{job.experience}</span>
                                </div>

                                {job.company_name && (
                                    <div className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                                        <Building2 size={16} className="text-gray-400" />
                                        <span className="font-circular">{job.company_name}</span>
                                    </div>
                                )}
                                {job.job_type && (
                                    <div className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                                        <Users size={16} className="text-gray-400" />
                                        <span className="font-circular">
                                            {Array.isArray(job.job_type)
                                                ? job.job_type.join(", ")
                                                : String(job.job_type)}
                                        </span>
                                    </div>
                                )}

                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-circular">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">{job.platform}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-500">{job.job_posted}</span>
                                </div>
                                {job.applications !== null && (
                                    <>
                                        <span className="text-gray-400">•</span>
                                        <span>{job.applications} applications</span>
                                    </>
                                )}
                                {job.easyapply && (
                                    <>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-green-600 flex items-center gap-1">
                                            <CheckCircle size={14} /> Easy Apply
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>



                    {job.skills && job.skills.length > 0 && (
                        <div className="pb-4">
                            <h4 className="font-circular font-medium text-gray-900 mb-2">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {visibleSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-2 bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue border border-primary-blue/20 rounded-lg text-sm font-circular transition-colors duration-200 cursor-default font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {shouldShowMoreSkills && (
                                    <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-circular">
                                        +{remainingSkillsCount} more
                                    </span>
                                )}


                            </div>
                        </div>
                    )}


                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <a
                            href={job.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary-blue hover:text-cyan-600 font-circular font-medium text-sm transition-colors duration-200 hover:underline"
                        >
                            <ExternalLink size={16} />
                            View Original Post
                        </a>

                        {!selectedJob && (
                            <Button
                                onClick={handleSelectJob}
                                className="bg-primary-blue hover:bg-cyan-600 text-white font-circular font-medium px-6 py-2 rounded-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                            >
                                Select This Job
                            </Button>
                        )}

                        {selectedJob && selectedJob._id === job._id && (
                            <div className="flex items-center gap-2 text-green-600 font-circular font-medium animate-fade-in">
                                <CheckCircle size={18} />
                                Job Selected
                            </div>
                        )}
                    </div>
                </div>




            </div>

            {/* Job Details Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="!w-full rounded-4xl rounded-r-none !max-w-[70rem] p-6  overflow-y-auto">

                    <SheetHeader className="">
                        <div className="flex items-start gap-4">
                            {job.company_logo && (
                                <img
                                    src={job.company_logo || "/images/placeholder.svg"}
                                    alt="Company logo"
                                    className="w-16 h-16 rounded-lg object-contain border border-gray-200"
                                />
                            )}


                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <SheetTitle className="font-circular font-semibold text-xl text-gray-900 leading-tight">
                                        {job.job_title}
                                    </SheetTitle>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500">
                                            •
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            {job.platform &&
                                                <span className="text-gray-500 font-circular text-base font-medium">
                                                    {job.location
                                                        && `${job.location}`
                                                    }
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Job basic info */}
                                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-circular">
                                        {job.experience}
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-circular">
                                        {job.salary}
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-circular">
                                        {job.applications} applications
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-circular">
                                        {job.job_posted}
                                    </span>
                                    {job.remote && (
                                        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-circular">
                                            Remote
                                        </span>
                                    )}

                                    {/* Job types */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {job.job_type.map((type) => (
                                            <span
                                                key={type}
                                                className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-circular"
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>



                                    {/* Sponsorship / Easy apply */}
                                    <div className="flex flex-wrap gap-2 text-sm font-circular text-gray-600">
                                        {job.sponsorship && (
                                            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-circular">
                                                Sponsorship Available
                                            </span>
                                        )}
                                        {job.easyapply && (
                                            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-circular">
                                                Easy Apply
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </SheetHeader>


                    <div className="bg-white">
                        <div className="flex flex-col gap-2">

                            <h4 className="font-circular font-medium text-gray-900 text-xl">
                                Job Details
                            </h4>

                            <div className="grid gap-4">
                                {/* Platform */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-circular font-medium text-gray-700 min-w-[100px]">
                                        Platform:
                                    </span>
                                    <span className="text-gray-600 font-circular bg-gray-100 px-3 py-1 rounded-md text-sm">
                                        {job.platform}
                                    </span>
                                </div>

                                {/* Company Name */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                    <span className="font-circular font-medium text-gray-700 min-w-[100px]">
                                        Company:
                                    </span>
                                    <span className="text-gray-500 font-circular">
                                        {job.company_name}
                                    </span>
                                </div>

                                {/* Industry */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                    <span className="font-circular font-medium text-gray-700 min-w-[100px]">
                                        Industry:
                                    </span>
                                    <span className="text-gray-500 font-circular">
                                        {job.industry}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="pb-6">
                        {job.description && (
                            <div className="pb-6">
                                <h4 className="font-circular font-medium text-gray-900 pb-3 text-lg">Job Description</h4>
                                <div className="text-gray-700 font-circular text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border">
                                    {job.description}
                                </div>
                            </div>
                        )}

                        {job.skills && job.skills.length > 0 && (
                            <div className="pb-6">
                                <h4 className="font-circular font-medium text-gray-900 pb-3 text-lg">
                                    Required Skills ({job.skills.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-2 bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue border border-primary-blue/20 rounded-lg text-sm font-circular transition-colors duration-200 cursor-default font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={job.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 items-center justify-center gap-2 text-primary-blue hover:text-cyan-600 font-circular font-medium text-sm transition-colors duration-200 hover:underline border border-primary-blue/30 hover:border-primary-blue/60 rounded-lg py-3 px-4 hover:bg-primary-blue/5"
                            >
                                <ExternalLink size={16} />
                                View Original Post
                            </a>

                            {!selectedJob && (
                                <Button
                                    onClick={() => {
                                        handleSelectJob()
                                        setIsSheetOpen(false)
                                    }}
                                    className="w-full h-10 bg-primary-blue hover:bg-cyan-600 text-white font-circular font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md"
                                >
                                    Select This Job
                                </Button>
                            )}

                            {selectedJob && selectedJob._id === job._id && (
                                <div className="flex items-center justify-center gap-2 text-green-600 font-circular font-medium py-3 px-4 border border-green-200 bg-green-50 rounded-lg">
                                    <CheckCircle size={18} />
                                    Job Selected
                                </div>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default JobCard;