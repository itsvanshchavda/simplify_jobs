"use client";
import Logo from '@/public/icons/logo'
import React, { useEffect, useState } from 'react'
import Padding from './padding'
import { AlignJustify, X } from 'lucide-react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { title: "Copilot", href: "/copilot" },
        { title: "Job Application Tracker", href: "/job-tracker" },
        { title: "Resume Builder", href: "/resume-builder" },
        { title: "Employees", href: "employees" }
    ]
    return (

        <div className={`w-full sticky  z-[50] top-0 ${scrolled ? "border-b " : ""} bg-white  py-[1rem]`}>
            <div className={"mx-auto w-full px-[1rem] sm:px-[3rem] max-w-[91rem]"}>


                <div className='flex items-center justify-between gap-5'>
                    <div className='flex items-center gap-8'>

                        <Link href={"/"}>
                            <Logo />
                        </Link>

                        <div className=' hidden xl:flex items-center gap-10'>
                            {links.map((item, index) => (
                                <Link href={item.href} key={index} className='font-medium hover:text-black duration-300 cursor-pointer text-gray-500 font-circular text-base'>
                                    {item?.title}
                                </Link>
                            ))}

                        </div>
                    </div>



                    <div className='flex items-center gap-4'>
                        <button className='text-primary-blue duration-300 hover:bg-primary-blue hover:text-white  xl:block hidden text-base py-2 px-4  rounded-full border-2 border-primary-blue font-circular'>
                            Log In
                        </button>


                        <button className='text-white text-base py-2 px-4 duration-300  rounded-full hover:bg-cyan-600 bg-primary-blue font-circular'>
                            Sign Up
                        </button>



                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <div className='hover:bg-gray-100 block xl:hidden p-1.5 rounded-sm cursor-pointer'>
                                    <AlignJustify className='text-gray-600' />
                                </div>
                            </DialogTrigger>

                            <DialogContent
                                zIndex={100}
                                showCloseButton={false}
                                className={`
    fixed left-1/2 top-5 -translate-x-1/2 rounded-sm !m-0 !p-0 border-none !max-w-[95%]
    transition-all duration-200 ease-out
    ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}
  `}
                            >

                                <DialogHeader className={"hidden"}>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                {/* Header */}
                                <div className='flex items-center justify-between px-5 py-4'>
                                    <Logo />
                                    <DialogClose>
                                        <div className='p-1.5 rounded-md hover:bg-gray-100'>
                                            <X className='text-gray-500' />
                                        </div>
                                    </DialogClose>
                                </div>

                                {/* Navigation Links */}
                                <div className='flex flex-col gap-4 px-[2rem]'>
                                    {links.map((item, index) => (
                                        <Link onClick={() => setOpen(!open)} href={item.href} key={index} className='font-[400] rounded-sm cursor-pointer p-2 hover:bg-gray-100 text-black font-circular text-base'>
                                            {item?.title}
                                        </Link>
                                    ))}
                                </div>

                                {/* Footer / Button */}
                                <div className='border-t px-5 py-4'>
                                    <button className='w-full font-circular hover:bg-cyan-600 bg-primary-blue text-white py-2 rounded-sm'>
                                        Log In
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>


                    </div>
                </div>
            </div>

        </div>



    )
}

export default Navbar