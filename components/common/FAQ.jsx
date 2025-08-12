"use client";
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const FAQ = ({ data }) => {


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
