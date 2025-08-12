"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Quote from "@/public/icons/quote";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
    );

    const data = [
        {
            review: "Simplify was crucial in helping me keep track of my applications and stay organized while interviewing.",
            user: "/images/user.webp",
            companyInfo: {
                name: "Operations Intern",
                heading: "Ava Wilson joined FYPM",
                logo: "/images/fypm.png",
            },
        },
        {
            review: "I got matched with startups I wouldn't have found myself and signed an offer within a week of applying!",
            user: "/images/user2.webp",
            companyInfo: {
                name: "Product Analyst Intern",
                heading: "Liam Chen joined Deloitte",
                logo: "/images/deloitte.png",
            },
        },
        {
            review: "Simplify notified me about Google's APM program the day it opened which was crucial in landing the offer!",
            user: "/images/user3.webp",
            companyInfo: {
                name: "Associate Product Manager",
                heading: "Emily Davis joined Discord",
                logo: "/images/discord.webp",
            },
        },
        {
            review: "I love the curated matches on Simplify. Makes it super easy to find jobs in specific industries",
            user: "/images/user4.webp",
            companyInfo: {
                name: "Marketing Intern",
                heading: "Noah Patel joined Google",
                logo: "/images/google.png",
            },
        },
        {
            review: "Simplify was definitely the most helpful platform I used during my job search",
            user: "/images/user5.webp",
            companyInfo: {
                name: "Finance Intern",
                heading: "Sophia Martinez joined Goldman Sachs",
                logo: "/images/gs.png",
            },
        },
        {
            review: "I would have never known about my internship if not for Simplify!",
            user: "/images/user6.webp",
            companyInfo: {
                name: "Software Engineering Intern",
                heading: "James Lee joined Discord",
                logo: "/images/discord.webp",
            },
        },


        {
            review: "I got matched with startups I wouldn't have found myself and signed an offer within a week of applying!",
            user: "/images/user2.webp",
            companyInfo: {
                name: "Product Analyst Intern",
                heading: "Liam Chen joined Deloitte",
                logo: "/images/deloitte.png",
            },
        },
        {
            review: "Simplify notified me about Google's APM program the day it opened which was crucial in landing the offer!",
            user: "/images/user3.webp",
            companyInfo: {
                name: "Associate Product Manager",
                heading: "Emily Davis joined Discord",
                logo: "/images/discord.webp",
            },
        },
        {
            review: "I love the curated matches on Simplify. Makes it super easy to find jobs in specific industries",
            user: "/images/user4.webp",
            companyInfo: {
                name: "Marketing Intern",
                heading: "Noah Patel joined Google",
                logo: "/images/google.png",
            },
        },
        {
            review: "Simplify was definitely the most helpful platform I used during my job search",
            user: "/images/user5.webp",
            companyInfo: {
                name: "Finance Intern",
                heading: "Sophia Martinez joined Goldman Sachs",
                logo: "/images/gs.png",
            },
        },
        {
            review: "I would have never known about my internship if not for Simplify!",
            user: "/images/user6.webp",
            companyInfo: {
                name: "Software Engineering Intern",
                heading: "James Lee joined Discord",
                logo: "/images/discord.webp",
            },
        },


        {
            review: "Simplify was crucial in helping me keep track of my applications and stay organized while interviewing.",
            user: "/images/user.webp",
            companyInfo: {
                name: "Operations Intern",
                heading: "Ava Wilson joined FYPM",
                logo: "/images/fypm.png",
            },
        },
        {
            review: "I got matched with startups I wouldn't have found myself and signed an offer within a week of applying!",
            user: "/images/user2.webp",
            companyInfo: {
                name: "Product Analyst Intern",
                heading: "Liam Chen joined Deloitte",
                logo: "/images/deloitte.png",
            },
        },
        {
            review: "Simplify notified me about Google's APM program the day it opened which was crucial in landing the offer!",
            user: "/images/user3.webp",
            companyInfo: {
                name: "Associate Product Manager",
                heading: "Emily Davis joined Discord",
                logo: "/images/discord.webp",
            },
        },
        {
            review: "I love the curated matches on Simplify. Makes it super easy to find jobs in specific industries",
            user: "/images/user4.webp",
            companyInfo: {
                name: "Marketing Intern",
                heading: "Noah Patel joined Google",
                logo: "/images/google.png",
            },
        },
        {
            review: "Simplify was definitely the most helpful platform I used during my job search",
            user: "/images/user5.webp",
            companyInfo: {
                name: "Finance Intern",
                heading: "Sophia Martinez joined Goldman Sachs",
                logo: "/images/gs.png",
            },
        },
        {
            review: "I would have never known about my internship if not for Simplify!",
            user: "/images/user6.webp",
            companyInfo: {
                name: "Software Engineering Intern",
                heading: "James Lee joined Discord",
                logo: "/images/discord.webp",
            },
        },
    ];

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {

        emblaApi?.scrollNext();
    }, [emblaApi]);


    return (
        <div className="w-full overflow-hidden bg-[#F0FCFF] pb-10">
            <div className="flex px-[1rem] flex-col justify-center items-center py-[4rem]">
                <h2 className="mx-auto font-circular max-w-lg text-center text-xl text-gray-700">Join over <b>1,000,000</b> candidates that hear back <b>25% more</b> with Simplify than on other platforms <Image src={"/images/tada.png"} alt="tada" width={20} height={20} className="inline-flex shrink-0" /></h2>
            </div>

            <div className="relative px-1 xl:px-10 pt-12 sm:pt-16">
                {/* Left Gradient Overlay */}
                <div className="absolute inset-y-0 left-0 h-[600px] w-[300px] max-w-[350px] z-10 hidden md:block pointer-events-none bg-gradient-to-r from-[#F0FCFF] xl:via-[#F0FCFF] via-[#F0FCFF]/70 to-transparent" />

                {/* Right Gradient Overlay */}
                <div className="absolute inset-y-0 right-0 h-[600px] w-[300px] max-w-[350px] z-10 hidden md:block pointer-events-none bg-gradient-to-l from-[#F0FCFF] xl:via-[#F0FCFF] via-[#F0FCFF]/70 to-transparent" />

                {/* Prev button */}
                <button
                    onClick={scrollPrev}
                    className=" hidden sm:block sm:absolute left-4 xl:left-[9rem] top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 border hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                >
                    <ChevronLeft size={30} className="text-primary-blue" />
                </button>

                {/* Next button */}
                <button
                    onClick={scrollNext}
                    className="hidden sm:block sm:absolute right-4 xl:right-[9rem] top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                >
                    <ChevronRight size={30} className="text-primary-blue" />
                </button>

                {/* Embla carousel */}
                <div
                    className=""
                    ref={emblaRef}

                >
                    <div className="flex flex-row  snap-x snap-mandatory">
                        {data.map((item, index) => (
                            <div

                                key={index}
                                className="min-w-[300px] mr-4  snap-start max-w-sm relative bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex-shrink-0"
                            >
                                <div className="absolute -top-10 left-6 z-10">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-lg">
                                        <Image
                                            src={item.user}
                                            className="rounded-full w-full h-full object-cover"
                                            alt="user"
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6">
                                    <Quote />
                                </div>
                                <div className="flex flex-col gap-6 justify-between h-full">
                                    <div className="font-circular pt-12 text-gray-700 text-base leading-relaxed">
                                        {`"${item.review}"`}
                                    </div>

                                    <div className="flex justify-between items-end gap-4">
                                        <div className="font-circular text-sm flex-1">
                                            <div className="font-semibold text-gray-800 mb-1 text-sm">
                                                {item.companyInfo.heading}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {item.companyInfo.name}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 w-16 lg:w-20">
                                            <Image
                                                alt="company logo"
                                                src={item.companyInfo.logo}
                                                width={80}
                                                height={32}
                                                className="w-full h-auto object-contain max-h-8"
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
