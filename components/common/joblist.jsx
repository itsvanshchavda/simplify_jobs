"use client";
import Highlight from '@/components/highlight'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const JobList = () => {


    const data = [
        { img: "/images/list1.png", title: "Top Summer 2025 Internships" },
        { img: "/images/list2.png", title: "Senior Software Jobs @ Unicorn Startups" },
        { img: "/images/list3.png", title: "New Grads Jobs in NYC" },
        { img: "/images/list4.png", title: "Top Entry-Level Remote Jobs" },
        { img: "/images/list5.png", title: "Internship in the SF Bay Area" },
        { img: "/images/list6.png", title: "Top Marketing Internships" },
        { img: "/images/list7.png", title: "Entry Level UI/UX Design Jobs" },
        { img: "/images/list8.png", title: "Entry Level IT & Cybersecurity Jobs" },
        { img: "/images/list1.png", title: "Internships @ Unicorns" },
    ];

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isExpanded, setIsExpanded] = useState(false);
    const [initialCount, setInitialCount] = useState(data.length);




    useEffect(() => {
        const updateCount = () => {
            if (window.innerWidth < 768) { // mobile
                setInitialCount(3);
                setVisibleCount(3);
            } else if (window.innerWidth < 1024) { // tablet
                setInitialCount(4);
                setVisibleCount(4);
            } else { // desktop
                setInitialCount(data.length);
                setVisibleCount(data.length);
            }
        };

        updateCount();
        window.addEventListener("resize", updateCount);
        return () => window.removeEventListener("resize", updateCount);
    }, []);

    const handleShowMore = () => {
        setVisibleCount(data.length);
        setIsExpanded(true);
    };

    const handleShowLess = () => {
        setVisibleCount(initialCount);
        setIsExpanded(false);
    };

    return (
        <div className='w-full bg-[#F0FCFF] flex flex-col gap-8 py-20 px-4'>
            {/* Heading */}
            <div className='w-full flex gap-5 md:gap-8 flex-col justify-center items-center'>
                <div className='text-5xl xl:text-6xl font-circular text-black/85 font-black text-center'>
                    Explore our <span className='flex flex-col gap-2'><Highlight title={"expert-curated"} /> job lists.</span>
                </div>
                <div className='text-center font-circular w-[99%] max-w-3xl font-normal text-xl'>
                    Our team handpicks the most exciting opportunities into lists for you to discover - updated daily.
                </div>
            </div>

            {/* Cards */}
            <div className='w-full mx-auto max-w-7xl'>
                <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {data.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={index}
                                className='bg-white group hover:border-primary-blue hover:shadow-xl rounded-md duration-300 cursor-pointer flex justify-between w-full p-4 border border-gray-100'
                            >
                                <div className='flex flex-col gap-4'>
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={56}
                                        height={56}
                                        className='object-cover'
                                    />
                                    <div className='font-circular group-hover:text-primary-blue font-medium text-lg'>
                                        {item.title}
                                    </div>
                                </div>

                                <div
                                    className='bg-gray-50 border h-fit p-1 border-gray-100 rounded-md duration-300 group-hover:border-primary-blue
                                   group-hover:bg-primary-blue/5 group-hover:text-primary-blue'
                                >
                                    <ArrowUpRight
                                        size={24}
                                        className='duration-300 group-hover:rotate-45'
                                    />
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* Show more */}
                    <div className='flex items-center justify-center'>
                        {!isExpanded && visibleCount < data.length && (
                            <div
                                onClick={handleShowMore}
                                className='cursor-pointer text-sm font-circular text-gray-500 flex items-center gap-1'
                            >
                                Show more Job lists <ChevronDown size={20} strokeWidth={1.2} />
                            </div>
                        )}


                        {/* Show Less */}
                        {isExpanded && (
                            <div
                                onClick={handleShowLess}
                                className='cursor-pointer text-sm font-circular text-gray-500 flex items-center gap-1'
                            >
                                Show less Job lists <ChevronUp size={20} strokeWidth={1.2} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobList;
