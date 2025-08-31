"use client"
import React, { useState, useEffect } from 'react'
import { IoFilterSharp, IoSearchSharp } from 'react-icons/io5'
import { MdBusinessCenter } from 'react-icons/md'
import { MapPin, Clock, Building2, Users, ExternalLink, CheckCircle, Bookmark, X, Plus, Loader2 } from 'lucide-react'
import GeAllJobsApi from '@/apis/job/GeAllJobsApi'
import GetJobDataApi from '@/apis/job/GetJobDataApi'
import SaveJobDataApi from '@/apis/job/SaveJobDataApi'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import JobCard from './jobcard'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

const SavedJobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const [addJobDialogOpen, setAddJobDialogOpen] = useState(false)
    const [jobUrl, setJobUrl] = useState('')
    const [addingJob, setAddingJob] = useState(false)

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            setLoading(true)
            const response = await GeAllJobsApi()
            setJobs(response?.jobs)
        } catch (error) {
            console.error('Error fetching jobs:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddJob = async () => {
        setAddingJob(true)
        if (!jobUrl.trim()) return

        setLoading
        const job = await GetJobDataApi({
            url: jobUrl.trim()
        })
        if (job?.error) {
            setAddingJob(false)
            toast.error(job.error)
            return
        }

        const saveResponse = await SaveJobDataApi(
            { jobData: job?.job }
        )
        if (saveResponse?.error) {
            toast.error(saveResponse.error)
            return
        }
        toast.success('Job added successfully!')
        setJobUrl('')
        setAddJobDialogOpen(false)
        setAddingJob(false)
        fetchJobs()

    }

    const filteredJobs = jobs?.length > 0 && jobs.filter(job =>
        job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )




    return (
        <div className='w-full max-w-container mx-auto flex flex-col gap-6 px-[1.5rem] pb-10 sm:py-8'>
            <div className='flex md:flex-row items-start sm:items-center gap-4 flex-col justify-between'>
                <div className='flex flex-col gap-2'>
                    <div className='font-circular text-2xl xl:text-3xl font-semibold'>
                        Saved Jobs
                    </div>
                    <div className='font-circular font-normal text-base text-gray-500'>
                        Manage and tailor all of your saved jobs here!
                    </div>
                </div>

                <div className="flex w-full max-w-[500px] items-center gap-3">
                    {/* Search Input */}
                    <div className="relative w-full">
                        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                            <IoSearchSharp size={18} />
                        </div>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by company name or title"
                            className="w-full pl-9 pr-3 h-10 text-sm rounded-full border border-gray-200 
                 text-secondary-400 placeholder:text-gray-400 
                 focus:outline-none focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/20 focus:ring-4
                 disabled:bg-[#F2F2F2] disabled:opacity-90 font-circular shadow-sm"
                        />
                    </div>


                    {/* Add Job Button */}
                    <button
                        onClick={() => setAddJobDialogOpen(true)}
                        className="flex items-center justify-center gap-2 h-10 min-w-[130px] px-4 rounded-md bg-primary-blue text-white text-sm font-circular hover:bg-primary-blue/90 transition"
                    >
                        <MdBusinessCenter size={17} />
                        Add Job
                    </button>
                </div>

            </div>

            {/* Jobs Content */}
            <div className="w-full">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-blue" />
                            <p className="text-gray-500 font-circular">Loading your saved jobs...</p>
                        </div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <MdBusinessCenter size={64} className="text-gray-300 mb-4" />
                        <h3 className="font-circular font-semibold text-xl text-gray-900 mb-2">
                            {searchTerm ? 'No jobs found' : 'No saved jobs yet'}
                        </h3>
                        <p className="text-gray-500 font-circular mb-6">
                            {searchTerm
                                ? 'Try adjusting your search terms or filters'
                                : 'Start building your job collection by adding jobs that interest you'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => setAddJobDialogOpen(true)}
                                className="flex items-center gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white font-circular font-medium px-6 py-3 rounded-md transition-all duration-300"
                            >
                                <Plus size={18} />
                                Add Your First Job
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 font-circular">
                                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Job Dialog */}

            <Dialog open={addJobDialogOpen} onOpenChange={setAddJobDialogOpen}>
                <DialogContent zIndex={100} className="sm:max-w-md  font-circular">
                    <DialogHeader>
                        <DialogTitle className="text-lg  font-semibold text-gray-900">
                            Add New Job
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            Paste the URL of the job posting you want to save.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Job URL Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Job URL
                        </label>
                        <input
                            type="url"
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                            placeholder="https://linkedin.com/jobs/..."
                            className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"
                        />
                    </div>

                    <DialogFooter className="flex gap-3 sm:justify-end">
                        <Button
                            disabled={addingJob}
                            variant="outline"
                            onClick={() => setAddJobDialogOpen(false)}
                            className="font-circular"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddJob}
                            disabled={!jobUrl.trim() || addingJob}
                            className="bg-primary-blue text-white hover:bg-primary-blue/90 font-circular flex items-center gap-2"
                        >
                            {addingJob ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />
                                    Add Job
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SavedJobs