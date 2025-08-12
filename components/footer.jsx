import Instagram from '@/public/icons/instagram'
import Linkedin from '@/public/icons/linkedin'
import LogoWhite from '@/public/icons/logowhite'
import Reddit from '@/public/icons/reddit'
import Tiktok from '@/public/icons/tiktok'
import Twitter from '@/public/icons/twitter'
import React from 'react'
import { Separator } from './ui/separator'

const Footer = () => {
    const data = [
        {
            title: "Features",
            links: [
                {
                    name: "Copilot",
                    href: "#"
                },


                {
                    name: "Job Tracker",
                    href: "#"
                },

                {
                    name: "Resume Builder",
                    href: "#"
                },


                {
                    name: "Resume Review",
                    href: "#"
                },

                {
                    name: "Employers",
                    href: "#"
                },

            ]
        },



        {
            title: "Opportunities",
            links: [
                {
                    name: "Browse All Jobs",
                    href: "#"
                },


                {
                    name: "Internships",
                    href: "#"
                },

                {
                    name: "Entry Level & New Grad",
                    href: "#"
                },


                {
                    name: "Experienced Job Seeker",
                    href: "#"
                },


                {
                    name: "Remote Work",
                    href: "#"
                },


                {
                    name: "Moonshots",
                    href: "#"
                },


                {
                    name: "Latest Jobs",
                    href: "#"
                },


                {
                    name: "Latest Companies",
                    href: "#"
                },

                {
                    name: "Curated Job Lists",
                    href: "#"
                },



            ]
        },


        {
            title: "Company",
            links: [
                {
                    name: "Blog",
                    href: "#"
                },


                {
                    name: "About",
                    href: "#"
                },

                {
                    name: "Careers",
                    href: "#"
                },


                {
                    name: "Support & FAQ",
                    href: "#"
                },

                {
                    name: "Terms",
                    href: "#"
                },

                {
                    name: "Privacy",
                    href: "#"
                },


                {
                    name: "Refund Policy",
                    href: "#"
                },

                {
                    name: "Service Status",
                    href: "#"
                },

            ]
        }
    ]
    return (
        <div className='bg-primary-blue '>
            <div className='sm:py-16 py-12  px-4 sm:px-6 lg:px-8 max-w-7xl  mx-auto '>
                <div className='flex xl:flex-row   justify-between flex-col  gap-12'>



                    <div className='flex flex-col gap-5'>
                        <LogoWhite />

                        <div className='flex items-center gap-4'>
                            <Instagram />
                            <Tiktok />
                            <Linkedin />
                            <Twitter />
                            <Reddit />
                        </div>

                    </div>









                    <div className='grid pb-10 tracking-wider text-sm grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-10'>

                        {data.map((item, index) => (
                            <div key={index}
                                className='flex flex-col gap-4'
                            >

                                <div className='font-circular font-medium uppercase  text-white text-sm'>
                                    {item.title}
                                </div>

                                <div className='flex flex-col gap-4'>
                                    {item.links.map((item, index) => (

                                        <div key={index} className='text-sm font-circular text-white/80 hover:text-white'>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}

                    </div>






                </div>



                <div className='flex flex-col gap-6'>
                    <div className='bg-white py-2    w-fit flex items-center gap-3 rounded-4xl px-4 font-circular'>
                        <div> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-[#14B8A6] animate-pulse" height="8" width="8" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></div>

                        <div className='font-circular font-medium text-sm'>
                            All Systems operational
                        </div>

                        <div className='text-xs font-circular text-gray-500 font-medium'>
                            View Details
                        </div>
                    </div>


                    <Separator className={"bg-white/20"} />


                    <div className='sm:pt-4 font-circular  text-white'>
                        &copy;  2025 Simplify. All rights reserved


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer