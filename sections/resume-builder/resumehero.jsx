import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ResumeHero = () => {
    return (
        <div className='w-full flex flex-col  gap-16 xl:py-20 py-10 px-4 max-w-7xl mx-auto'>
            <div className='flex lg:flex-row flex-col gap-6 justify-between  items-center'>
                <div className='flex max-w-2xl  lg:items-start items-center flex-col gap-8'>
                    <div className='font-circular lg:text-start text-center font-black  text-5xl sm:text-6xl text-black/85'>
                        Build the best resume. Get more offers.


                    </div>

                    <div className='font-circular lg:text-start text-center text-xl '>
                        Craft tailored AI resumes, identify keywords missing and get personalized tips on how to optimize your resume, all in a few clicks.


                    </div>

                    <div className='pt-5 flex flex-col gap-10 lg:items-start items-center'>

                        <button className='bg-primary-blue w-fit  hover:bg-cyan-600 duration-300 font-circular  py-3.5 px-8 rounded-4xl text-white'>
                            Get a Free Resume
                        </button>


                        <div className='flex flex-row items-center gap-2'>

                            <div className='flex items-center'>
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                                <Star size={18} className='fill-yellow-400' strokeOpacity={0} />
                            </div>

                            <div className='text-sm font-circular text-gray-500'>
                                Join over 1,000,000 job seekers who use Simplify
                            </div>



                        </div>
                    </div>

                </div>


                <div>
                    <Image
                        src={"/images/resume-hero.svg"}
                        alt="copilot"
                        width={500}
                        height={500}
                        className="w-full max-w-md object-cover"
                    />
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
                        className={`w-[65px] h-[40px] sm:w-[100px] sm:h-[50px] object-contain ${i === 8 ? 'sm:block hidden' : ''
                            }`}
                    />
                ))}
            </div>

        </div>
    )
}

export default ResumeHero