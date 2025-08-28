"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ResumeTemplate1 } from '../resumeditor/templates/resumetemplate1'
import GetResumeById from '@/apis/resume/GetResumeByIdApi'
import { useParams } from 'next/navigation'
import Loader from '@/components/loader'
import toast from 'react-hot-toast'
import GetPublicResumeApi from '@/apis/resume/GetPublicResumeApi'
import Link from 'next/link'

const ShareResume = () => {
    const [resume, setResume] = useState(null)
    const { public_id } = useParams();

    const effectRun = useRef(false)
    const [loading, setLoading] = useState(false)

    const getResume = async () => {

        setLoading(true)

        const res = await GetPublicResumeApi({ public_id })

        if (res.error) {
            setLoading(false)
            toast.error(res.error)
            return
        }

        setLoading(false)
        setResume(res?.resume?.json)


    }


    useEffect(() => {

        if (effectRun.current == false) {
            getResume()
        }

        return () => {
            effectRun.current = true
        }

    }, [public_id])



    if (loading) {
        return (
            <Loader />
        )
    }




    return (
        <div className='flex xl:flex-row px-[1rem] flex-col-reverse xl:items-start items-center h-full py-5 justify-center gap-4'>

            <div className='bg-white flex w-full xl:w-[450px] flex-col items-center gap-4 h-fit border p-6 rounded-xl'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <div className='font-circular font-medium max-w-sm text-center text-2xl'>
                        Create A Tailored Resume for Every Job with AI

                    </div>

                    <div className='font-circular max-w-sm text-center text-base text-gray-600'>
                        Forget adding keywords to your resume. Simplify AI analyzes the job description you're applying to and generates a tailored resume in 1-click.
                    </div>

                    <div>
                        <img src='/images/tailor.gif' className='rounded-md' width={350} height={350} />
                    </div>


                </div>

                <Link href={'/auth/register'} className='w-full'>
                    <div className='py-2 px-4 text-center hover:bg-cyan-600 bg-primary-blue text-white font-circular text-lg rounded-4xl'>
                        Build your free resume
                    </div>
                </Link>
            </div>
            <div className="w-full max-w-[47rem]">
                <div className="relative bg-white border-[20px] border-primary-lighter h-[calc(100vh-100px)] overflow-y-auto">
                    <ResumeTemplate1 userResume={resume} />
                </div>
            </div>

        </div>
    )
}

export default ShareResume