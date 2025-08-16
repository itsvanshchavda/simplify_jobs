"use client";
import Highlight from '@/components/highlight';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import back1 from '@/public/images/back_1.webp'
import back2 from '@/public/images/back_2.webp'
import Image from 'next/image';
import mag from '@/public/images/mag.png'
import zap from '@/public/images/zap.png'
import memo from '@/public/images/memo.png'
import bag from '@/public/images/briefcase.png'
import Link from 'next/link';
const Hero = () => {

    const [activeTab, setActiveTab] = useState("jobmatch");


    return (
        <div className='w-full  relative flex flex-col gap-[3rem]  pt-[3rem] justify-center items-center'>

            <div className=' hidden xl:block xl:absolute animate-float top-0 left-1'>
                <Image className='max-w-[450px]' alt='back1' src={back1} />
            </div>


            <div className='hidden xl:block xl:absolute animate-float top-5 right-1'>
                <Image className='max-w-[450px]' alt='back1' src={back2} />
            </div>

            <div className='flex items-center justify-center flex-col gap-8'>
                <div className='font-circular text-5xl lg:text-6xl flex items-center  flex-col text-black/85 font-black'>
                    <div className='text-center'>
                        Your entire job search.

                    </div>

                    <div className='flex items-center gap-2'>
                        <div className="flex flex-col lg:flex-row lg:gap-4">Powered by <Highlight title={"one profile."} /></div>
                    </div>
                </div>

                <div className='text-center font-circular w-[95%] max-w-3xl font-normal text-xl'>
                    Get personalized job recommendations, craft tailored resumes, autofill and track your job applications. We're here for every step of the process.

                </div>
            </div>


            <Link href={"/auth/register"} className='bg-primary-blue hover:bg-cyan-600 duration-300 font-circular text-lg py-3 px-10 rounded-4xl text-white'>
                Sign Up - It's Free!
            </Link>

            <div className='flex flex-col sm:flex-row items-center gap-2'>

                <div className='flex items-center'>
                    <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                    <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                    <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                    <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                    <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                </div>

                <div className='text-sm font-circular text-gray-500'>
                    Join 1,000,000+ job seekers who use Simplify
                </div>



            </div>


            {/* Features Card  */}

            <div className='flex flex-col w-full px-2  justify-center items-center'>
                {/* Tab Buttons */}
                <div className="flex max-w-full w-fit  px-2 py-[2rem] mx-auto rounded-2xl overflow-y-hidden overflow-x-auto items-center h-[60px] sm:h-[50px] border bg-white sm:bg-gray-50  gap-2 sm:gap-1">
                    {[
                        { key: "jobmatch", label: "Job Matches", icon: mag },
                        { key: "copilot", label: "Copilot Extension", icon: zap },
                        { key: "resume", label: "AI Resume Builder", icon: memo },
                        { key: "jobtracker", label: "Job Tracker", icon: bag },
                    ].map(({ key, label, icon }) => (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex cursor-pointer flex-shrink-0 whitespace-nowrap transition-all duration-300 items-center gap-2 py-1 sm:py-2 rounded-xl border font-medium px-2 sm:px-5 !shadow-none ${activeTab === key
                                ? "font-bold sm:border  border-transparent sm:border-gray-300 bg-gray-50 sm:bg-white"
                                : "border-transparent sm:bg-none bg-gray-50"
                                }`}
                        >
                            {/* Mobile */}
                            <div
                                className={`flex sm:hidden  rounded-xl h-[40px] px-2 items-center gap-2 ${activeTab === key ? "bg-white border" : ""
                                    }`}
                            >
                                <Image src={icon} alt={key} width={20} height={20} />
                                <div
                                    className={`font-circular sm:text-[1rem] text-sm ${activeTab === key ? "font-bold" : "font-medium"
                                        }`}
                                >
                                    {label}
                                </div>
                            </div>

                            {/* Desktop */}
                            <div className="hidden sm:flex items-center gap-1">
                                <Image src={icon} alt={key} width={20} height={20} />
                                <div
                                    className={`font-circular ${activeTab === key ? "font-bold" : "font-medium"
                                        }`}
                                >
                                    {label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Tab Content */}
                <div className="w-[752px] px-1.5  max-h-[562px] max-w-full pt-4">
                    {activeTab === "jobmatch" && (
                        <div className="animate-fade-in">
                            <img
                                src={"/images/job_matches.webp"}
                                alt="jobs"
                                width={500}
                                height={500}

                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    {activeTab === "copilot" && (
                        <div className="animate-fade-in">
                            <img
                                src={"/images/copilot.webp"}
                                alt="copilot"
                                width={500}
                                height={500}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    {activeTab === "resume" && (
                        <div className="animate-fade-in">
                            <img
                                src={"/images/resume_builder.webp"}
                                alt="resume"
                                width={500}
                                height={500}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    {activeTab === "jobtracker" && (
                        <div className="animate-fade-in">
                            <img
                                src={"/images/job_tracker.webp"}
                                alt="tracker"
                                width={500}
                                height={500}
                                className="w-full max-h-[562px]  object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>


            <div className="flex flex-wrap justify-center items-center sm:gap-10 gap-8">
                {[
                    '/images/c1.png',
                    '/images/c2.png',
                    '/images/c3.png',
                    '/images/c4.png',
                    '/images/c5.png',
                    '/images/c6.png',
                    '/images/c7.png',
                    '/images/c8.png',
                    '/images/c9.png',
                ].map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`company${i + 1}`}
                        className={`w-[65px] h-[40px]  object-contain ${i === 8 ? 'sm:block hidden' : ''
                            }`}
                    />
                ))}
            </div>
        </div >
    )
}

export default Hero