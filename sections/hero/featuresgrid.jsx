import Highlight from '@/components/highlight'
import Padding from '@/components/padding'
import React from 'react'
import firstGrid from '@/public/images/grid1.png'
import secondGrid from '@/public/images/grid2.png'
import thirdGrid from '@/public/images/grid3.png'
import fourthGrid from '@/public/images/grid4.png'
import fifthGrid from '@/public/images/grid5.png'

import Image from 'next/image'
const FeaturesGrid = () => {
    return (
        <div className='w-full py-20 px-4 flex flex-col gap-14 justify-center items-center'>


            <div className='w-full flex  gap-5 md:gap-8 flex-col justify-center items-center'>
                <div className=' text-5xl xl:text-6xl font-circular text-black/85 font-black text-center'>
                    More tools to help you <span className=' block sm:flex gap-2'><Highlight title={"stand out"} /> from the crowd</span>
                </div>

                <div className='text-center font-circular w-[99%] max-w-3xl font-normal text-xl'>
                    Explore all the features we offer to supercharge your job or internship search.

                </div>
            </div>


            <div className='flex w-full mx-auto md:max-w-[600px] lg:max-w-7xl  gap-4 items-center flex-col '>
                <div className=' grid gap-4 grid-cols-1 lg:grid-cols-6'>
                    <div className='bg-[#F8FAFC]  col-span-3 flex flex-col items-start justify-center rounded-2xl border border-gray-100  py-6 '>
                        <Image src={firstGrid} alt="grid1" className='w-full h-auto object-cover rounded-2xl' />

                        <div className='flex flex-col px-10'>
                            <div className='font-circular text-[28px] font-semibold text-black'>
                                Resume ATS Score
                            </div>

                            <div className='font-circular text-lg text-gray-500 '>
                                See what's wrong with your resume and how to fix it


                            </div>
                        </div>
                    </div>
                    <div className='bg-[#F8FAFC]  col-span-3 flex flex-col items-start justify-center rounded-2xl border border-gray-100  py-6'>
                        <Image src={secondGrid} alt="grid1" className='w-full h-auto object-cover rounded-2xl' />

                        <div className='flex flex-col px-10'>
                            <div className='font-circular text-[28px] font-semibold text-black'>
                                Cover Letter & Email Generator
                            </div>

                            <div className='font-circular text-lg text-gray-500 '>
                                Craft personalized cover letters and networking emails
                            </div>
                        </div>
                    </div>
                </div>



                <div className='grid    gap-4 grid-cols-1 lg:grid-cols-6'>
                    <div className='bg-[#F8FAFC] col-span-2 flex flex-col items-start justify-center rounded-2xl border border-gray-100  py-6 '>
                        <Image src={thirdGrid} alt="grid1" className='w-full h-auto object-cover rounded-2xl' />

                        <div className='flex flex-col px-10'>
                            <div className='font-circular text-[28px] font-semibold text-black'>
                                Career Journal

                            </div>

                            <div className='font-circular text-lg text-gray-500 '>
                                Track all your career achievements and get promoted faster

                            </div>
                        </div>
                    </div>
                    <div className='bg-[#F8FAFC] col-span-2 flex flex-col items-start justify-center rounded-2xl border border-gray-100  py-6 '>
                        <Image src={fourthGrid} alt="grid1" className='w-full h-auto object-cover rounded-2xl' />

                        <div className='flex flex-col px-10'>
                            <div className='font-circular text-[28px] font-semibold text-black'>
                                Networking Copilot

                            </div>

                            <div className='font-circular text-lg text-gray-500 '>
                                We help you find the hiring manager and send a personalized email


                            </div>
                        </div>
                    </div>

                    <div className='bg-[#F8FAFC] col-span-2 flex flex-col items-start justify-center rounded-2xl border border-gray-100  py-6 '>
                        <Image src={fifthGrid} alt="grid1" className='w-full h-auto object-cover rounded-2xl' />

                        <div className='flex flex-col px-10'>
                            <div className='font-circular text-[28px] font-semibold text-black'>
                                Job Lists

                            </div>

                            <div className='font-circular text-lg text-gray-500 '>
                                Handpicked collections of the most exciting companies and opportunities


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default FeaturesGrid