import FileUser from '@/public/icons/fileuser'
import LetterIcon from '@/public/icons/lettericon'
import QuestionIcon from '@/public/icons/questionicon'
import { Upload } from 'lucide-react'
import React from 'react'

const AllDocuments = () => {
    return (
        <div className='w-full max-w-hero mx-auto flex flex-col gap-6 px-[1.5rem] py-8'>
            <div className='flex lg:flex-row gap-4 flex-col justify-between '>
                <div className='flex flex-col gap-2'>
                    <div className='font-circular text-3xl font-semibold'>
                        My Documents

                    </div>

                    <div className='font-circular font-normal text-base text-gray-500'>
                        Manage and tailor all of your job search documents here!


                    </div>
                </div>
                <button className='font-circular w-fit text-sm flex items-center gap-2 text-white h-10 bg-primary-blue px-4 rounded-md'>
                    <Upload size={17} className='text-white' />
                    Upload resume
                </button>



            </div>

            <div className='bg-white flex flex-col gap-4 p-4'>

                <div className='font-circular tracking-wide font-medium'>
                    Create a new document


                </div>


                <div className='grid gap-4  grid-cols-1 lg:grid-cols-3'>
                    <div className='flex border border-gray-100 p-4 rounded-md gap-2 items-center justify-start'>
                        <div className='w-14 h-14 flex justify-center items-center rounded-full bg-primary-blue/10'>
                            <FileUser />

                        </div>
                        <div className='flex flex-col'>

                            <div className='font-circular
                         font-medium'>
                                Resume
                            </div>

                            <div className='text-sm font-circular font-extralight text-gray-600'>
                                Craft perfect resume and tailor it to a job
                            </div>
                        </div>

                    </div>



                    <div className='flex border border-gray-100 p-4 rounded-md gap-2 items-center justify-start'>
                        <div className='w-14 h-14 flex justify-center items-center rounded-full bg-primary-blue/10'>
                            <LetterIcon />

                        </div>
                        <div className='flex flex-col'>

                            <div className='font-circular
                         font-medium'>
                                Cover Letter
                            </div>

                            <div className='text-sm font-circular font-extralight text-gray-600'>
                                Create and customize a cover letter with AI
                            </div>
                        </div>

                    </div>


                    <div className='flex border border-gray-100 p-4 rounded-md gap-2 items-center justify-start'>
                        <div className='w-14 h-14 flex justify-center items-center rounded-full bg-primary-blue/10'>
                            <QuestionIcon />

                        </div>
                        <div className='flex flex-col'>

                            <div className='font-circular
                         font-medium'>
                                AI Questions
                            </div>

                            <div className='text-sm font-circular font-extralight text-gray-600'>
                                Generate interview questions and answers
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDocuments