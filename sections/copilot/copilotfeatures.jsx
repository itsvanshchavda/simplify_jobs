"use client";
import Highlight from '@/components/highlight'
import React from 'react'
const features = [
    {
        title: "Autofill job application questions in 1-click",
        description: "Hate re-entering the same information on every job application? Simplify autofills your information so you can focus on the question that actually matter.",
        img: "/images/copilot-f1.webp",
        button: "Ready to apply faster?",
        reverse: true
    },
    {
        title: "Optimize & improve your resume for every job",
        description: "Simplify scores your resume based on the job description you're applying to and shares insights on how to optimize and tailor your resume to be a stronger candidate.",
        img: "/images/copilot-f2.webp",
        button: "View Your Resume Score",
        reverse: false
    },
    {
        title: "Craft personalized responses with AI",
        description: "Our AI analyzes the job description you're applying to and helps you write tailored answers to questions like \"why are you a good fit for this role?\" in 1-click.",
        img: "/images/copilot-f3.webp",
        button: "Apply with Simplify AI",
        reverse: true
    },
    {
        title: "Automatically track your applications",
        description: "Every application you submit with Simplify Copilot gets automatically saved to your dashboard. No more messy spreadsheets.",
        img: "/images/copilot-f4.webp",
        button: "Track your Applications",
        reverse: false,
        reverseMobile: true
    }
];


const CopilotFeatures = () => {
    return (
        <div className="py-20 justify-center bg-[#F0FCFF] items-center flex flex-col gap-20">
            <div className="w-full px-[1rem] flex gap-4 md:gap-8 flex-col justify-center items-center">
                <div className="text-4xl sm:text-6xl  font-circular text-black/85 font-black text-center">
                    <span className="block">Land Your Dream Job</span>
                    <span className="block">
                        with <Highlight title="Simplify Copilot." />
                    </span>
                </div>
                <div className="text-center font-circular w-[99%] max-w-3xl font-normal text-base sm:text-xl">
                    Simplify users have applied to over 30 million jobs and saved over 500,000+ hours of time – just this year.

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

export default CopilotFeatures;
