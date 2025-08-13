"use client";
import Highlight from '@/components/highlight'
import React from 'react'
const features = [
    {
        title: "Build and optimize an ATS-friendly resume",
        description: "Our AI resume builder analyzes the job you're applying for and shows you a resume score that you can optimize",
        img: "/images/resume-f1.webp",
        button: "Tailor Your Resume",
        reverse: true
    },
    {
        title: "See important keywords missing in your resume",
        description: "Simplify highlights the most important keywords in the job description you're applying to and uses AI to help you naturally incorporate them into your resume.",
        img: "/images/resume-f2.webp",
        button: "View Missing Keywords",
        reverse: false
    },
    {
        title: "Get personalized resume tips from Simplify's AI",
        description: "We trained an AI on recruiter-approved resumes to give you targeted suggestions and tips for every job you apply to.",
        img: "/images/resume-f3.webp",
        button: "See AI Suggestions",
        reverse: true
    },
    {
        title: "Write tailored cover letters in one-click",
        description: "Our AI helps you generate custom cover letters based on your resume and the job you're applying to. Land more interviews with by adding a personalized narrative in your applications – without spending hours.",
        img: "/images/resume-f4.webp",
        button: "See AI Suggestions",
        reverse: false,
        reverseMobile: true
    }
];


const ResumeFeatures = () => {
    return (
        <div className="py-20 justify-center bg-[#F0FCFF] items-center flex flex-col gap-20">
            <div className="w-full px-[1rem] flex gap-4 md:gap-8 flex-col justify-center items-center">
                <div className="text-4xl sm:text-6xl  font-circular text-black/85 font-black text-center">
                    <span className="block">
                        Create the perfect resume

                    </span>
                    <span className="block">
                        with <Highlight title="Simplify Copilot." />
                    </span>
                </div>
                <div className="text-center font-circular w-[99%] max-w-3xl font-normal text-base sm:text-xl">
                    Simplify users have created over 2 million resumes and applied to more than 40+ million jobs. In just this year.


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
                            <button className='font-circular font-medium text-base px-4 py-3 w-full max-w-[220px] text-white bg-primary-blue rounded-4xl'>
                                {feature.button}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeFeatures;
