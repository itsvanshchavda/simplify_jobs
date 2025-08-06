"use client";
import Highlight from '@/components/highlight'
import Padding from '@/components/padding'
import Image from 'next/image'
import React from 'react'
import mag from '@/public/images/mag.png'
import zap from '@/public/images/zap.png'
import memo from '@/public/images/memo.png'
import bag from '@/public/images/briefcase.png'


import { Star } from 'lucide-react';


const Features = () => {

    return (
        <Padding className={"py-[3rem] justify-center items-center flex flex-col gap-20 xl:py-[5rem]"}>

            <div className='w-full flex  gap-5 md:gap-8 flex-col justify-center items-center'>
                <div className=' text-5xl xl:text-6xl font-circular text-black/85 font-black text-center'>
                    We're here for <span className=' block sm:flex gap-2'><Highlight title={"every step"} /> of your search</span>
                </div>

                <div className='text-center font-circular w-[99%] max-w-3xl font-normal text-xl'>
                    Tell us about your career history and goals. We'll help you craft a standout profile and help you land your dream job.
                </div>
            </div>

            <div className='w-full flex flex-col gap-20 '>

                {/* feature 1  */}
                <div className='flex  lg:flex-row-reverse justify-center items-center  flex-col sm:gap-8 gap-7'>
                    <Image src={"/images/f1.svg"} width={600} height={600} alt='svg' className=' overflow-hidden h-full border border-gray-100 rounded-3xl object-contain' />


                    <div className='flex flex-col md:gap-7 gap-5'>
                        <div className='flex items-center  gap-2'>
                            <div className='p-2 bg-gray-50 rounded-lg border border-gray-100'>
                                <Image src={mag} width={20} height={20} alt='mag' />
                            </div>
                            <div className='text-gray-600 text-xl font-circular font-[400]'>
                                Job Matches
                            </div>
                        </div>

                        <div className='font-circular w-full max-w-[600px] font-medium sm:text-5xl text-4xl'>
                            Get matched to relevent jobs, personalized to you
                        </div>

                        <div className='font-circular w-full max-w-[600px] text-lg'>
                            Forget endlessly scrolling on job boards. Tell us your preferences & dealbreakers and we'll match you with jobs that fit.
                        </div>

                        <button className='font-circular  font-medium text-base px-4 py-3 w-full max-w-[220px] text-white bg-primary-blue rounded-4xl'>
                            Get Matched Now
                        </button>
                    </div>
                </div>

                {/* feature 2  */}


                <div className='flex bg-[#F0FCFF] lg:flex-row-reverse justify-center items-center py-[4rem] flex-col sm:gap-8 gap-7'>


                    <div className='flex flex-col md:gap-8 gap-5'>
                        <div className='flex items-center  gap-2'>
                            <div className='p-2 bg-white rounded-lg border border-gray-100'>
                                <Image src={zap} width={20} height={20} alt='zap' />
                            </div>
                            <div className='text-gray-600 text-xl font-circular font-[400]'>
                                Autofill Applications


                            </div>
                        </div>

                        <div className='font-circular w-full max-w-[600px] font-medium sm:text-5xl text-4xl'>
                            Autofill repetitive job application questions

                        </div>

                        <div className='font-circular w-full max-w-[600px] text-lg'>
                            Install the Simplify Copilot extension to autofill your job applications & see keywords missing in your resume.

                        </div>


                        <div className='flex item-center gap-4'>
                            <button className='font-circular  font-medium text-base px-4 py-3 w-full max-w-[220px] text-white bg-primary-blue rounded-4xl'>
                                Add to Brave
                            </button>

                            <button className='font-circular  font-medium text-base px-4 py-3 w-full max-w-[220px] border-2 bg-white text-primary-blue border-primary-blue rounded-4xl'>
                                Learn More
                            </button>
                        </div>


                        <div className='flex flex-col sm:flex-row items-center gap-2'>

                            <div className='flex items-center'>
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                            </div>

                            <div className='text-sm font-circular text-gray-500'>
                                200,000,000+ applications submitted
                            </div>



                        </div>
                    </div>


                    <Image src={"/images/f2.svg"} width={600} height={600} alt='svg' className=' overflow-hidden h-full object-contain' />

                </div>


                {/* feature 3  */}

                <div className='flex  lg:flex-row-reverse justify-center items-center  flex-col sm:gap-8 gap-7'>


                    <div className='flex flex-col md:gap-7 gap-5'>
                        <div className='flex items-center  gap-2'>
                            <div className='p-2 bg-gray-50 rounded-lg border border-gray-100'>
                                <Image src={bag} width={20} height={20} alt='bag' />
                            </div>
                            <div className='text-gray-600 text-xl font-circular font-[400]'>
                                Job Tracker
                            </div>
                        </div>

                        <div className='font-circular w-full max-w-[600px] font-medium sm:text-5xl text-4xl'>
                            Bookmark jobs and track your search

                        </div>

                        <div className='font-circular w-full max-w-[600px] text-lg'>
                            Goodbye spreadsheets. Bookmark job postings from 50+ job boards and manage your applications within our job tracker.


                        </div>

                        <button className='font-circular  font-medium text-base px-4 py-3 w-full max-w-[220px] text-white bg-primary-blue rounded-4xl'>
                            Track your Applications
                        </button>
                    </div>



                    <Image src={"/images/f4.webp"} width={600} height={600} alt='svg' className=' overflow-hidden h-full  object-cover' />

                </div>
            </div>
        </Padding>
    )
}

export default Features