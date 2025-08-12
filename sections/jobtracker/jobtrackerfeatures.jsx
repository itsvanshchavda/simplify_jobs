"use client";
import Highlight from '@/components/highlight'
import React from 'react'





const features = [
    {
        title: "See all your applications in one place",
        description: "Every job you apply to using Simplify is automatically saved to your job tracker. Our tracker makes it easy update your status for each job and generate follow-up emails to recruiters.",
        img: "/images/jobtrack-f1.webp",
        button: "Track an application!",
        reverse: true
    },
    {
        title: "Visualize your job search and get insights",
        description: "Get comprehensive analytics to monitor your job search journey. See which resumes are performing, visualize your progress, and get hired faster!",
        img: "/images/jobtrack-f2.webp",
        button: "See your insights",
        reverse: false
    },
    {
        title: "Take notes & track contacts",
        description: "Track recruiters, referrals, and other contacts for every job you apply to. Record interview notes, dates, and more to stay organized during the interview process.",
        img: "/images/jobtrack-f3.webp",
        button: "Organize your applications",
        reverse: true
    },
    {
        title: "Save & bookmark jobs anywhere on the web",
        description: "Save interesting jobs for later and apply when you're ready. Simplify helps you keep track of openings you're excited about and optimize your applications.",
        img: "/images/jobtrack-f4.webp",
        button: "Bookmark a job",
        reverse: false,
    },

    {
        title: "Add custom applications at any time",
        description: "Have a spreadsheet of jobs you've already applied to? No worries - easily import custom job applications to your tracker and organize them within Simplify in minutes.",
        img: "/images/jobtrack-f5.webp",
        button: "Start tracking now",
        reverse: true,

        reverseMobile: true
    }
];
const JobTrackerFeatures = () => {
    return (
        <div className="py-20 justify-center bg-[#F0FCFF] items-center flex flex-col gap-20">
            <div className="w-full px-[1rem] flex gap-4 md:gap-8 flex-col justify-center items-center">
                <div className="text-4xl sm:text-6xl  font-circular text-black/85 font-black text-center">
                    <span className="block">
                        Stay organized with Simplify's

                    </span>
                    <span className="block">
                        <Highlight title="all-in-one" /> job tracker.
                    </span>
                </div>
                <div className="text-center font-circular w-[99%] max-w-[700px] font-normal text-base sm:text-xl">
                    No more messy spreadsheets. Simplify's job tracker helps you manage and prioritize jobs to make sure you put your best foot forward in every interview.

                </div>
            </div>


            <div className='w-full max-w-7xl flex flex-col gap-20'>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`flex px-[1rem] justify-between items-center flex-col sm:gap-8 gap-7 
                        ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
                        ${feature.reverseMobile ? "flex-col-reverse" : ""}`}
                    >
                        <img
                            src={feature.img}
                            width={600}
                            height={600}
                            alt='feature'
                            className='overflow-hidden w-full max-w-[616px] h-full object-contain'
                        />

                        <div className='flex max-w-[550px] flex-col gap-10'>
                            <div className='flex flex-col md:gap-6 gap-5'>
                                <div className='font-circular w-full font-medium sm:text-5xl text-4xl'>
                                    {feature.title}
                                </div>
                                <div className='font-circular w-full text-lg'>
                                    {feature.description}
                                </div>
                            </div>
                            <button className='font-circular font-medium text-base px-4 py-3 w-full max-w-[240px] text-white bg-primary-blue rounded-4xl'>
                                {feature.button}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobTrackerFeatures;
