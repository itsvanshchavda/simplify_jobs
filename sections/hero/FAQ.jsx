"use client";
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const FAQ = () => {
    const data = [
        {
            question: "Is Simplify free? How do you make money?",
            answer: "We dropped out of college and started Simplify to equip job seekers with the tools they need to put their best foot forward in the job search. The base version of Simplify and Simplify Copilot – including unlimited job tracking and autofill – is and will be free forever. We make money by charging companies to post jobs and promote their openings – we don't sell your data. We also have a premium subscription called Simplify+ that offers an additional suite of AI features to help you supercharge your job search."
        },
        {
            question: "How does Simplify work?",
            answer: "Think of Simplify like a personal Hollywood-agent for your career. When you create a profile, you'll tell us the skills you have, the types jobs you're looking for, and any dealbreakers (minimum salary, location, etc.). Our AI will match you with specific opportunities that fit you from the millions of opportunities in our database. When you apply, we'll help you autofill your application and show you the most important keywords that are missing from your resume. We have an AI resume builder that lets you tailor your resume in seconds. Finally, our tracker helps you stay organized across all the jobs you've applied to. Ready to see Simplify in action? Click the teal “Sign-Up” button to get started!"
        },
        {
            question: "How does Simplify handle my data?",
            answer: "We're internet users too and place a heavy emphasis and commitment to your privacy. First and foremost, we do not sell your data. The data you share with us is used to help match you with relevant jobs and autofill your applications. Simplify also operates as a hiring marketplace, meaning recruiters often use Simplify to post exclusive opportunities and find perfect-fit candidates (like you!). None of your data is shared with anyone off-platform without your consent – that's a promise!"
        },
        {
            question: "How does Simplify get the job posting it recommends me?",
            answer: "We're internet users too and place a heavy emphasis and commitment to your privacy. First and foremost, we do not sell your data. The data you share with us is used to help match you with relevant jobs and autofill your applications. Simplify also operates as a hiring marketplace, meaning recruiters often use Simplify to post exclusive opportunities and find perfect-fit candidates (like you!). None of your data is shared with anyone off-platform without your consent – that's a promise!"
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='w-full max-w-5xl mx-auto bg-white flex justify-center flex-col gap-8 py-20 px-4'>
            <div className='flex flex-col items-center justify-center gap-8'>
                <div className='xl:text-6xl text-5xl font-circular font-black'>
                    Got questions?
                </div>
                <div className='text-xl font-circular'>
                    Explore our FAQ section to learn more.
                </div>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
                {data.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index}>
                            <div
                                className="flex justify-between gap-6 items-center py-6 cursor-pointer sm:px-8"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex bg-gray-50 border border-gray-100 p-2 px-2 rounded-md items-center shrink-0">
                                        <Image
                                            width={20}
                                            height={20}
                                            alt="chat"
                                            src={"/images/chat.png"}
                                        />
                                    </div>
                                    <div
                                        className={`font-circular text-left text-lg sm:text-xl ${isOpen ? "text-primary-blue" : "text-gray-900"
                                            }`}
                                    >
                                        {item.question}
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    {isOpen ? (
                                        <Minus className="text-primary-blue" />
                                    ) : (
                                        <Plus className="text-gray-900" />
                                    )}
                                </div>
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="sm:px-8 pl-14 pr-4 pb-6 text-gray-800 font-circular">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
};

export default FAQ;
