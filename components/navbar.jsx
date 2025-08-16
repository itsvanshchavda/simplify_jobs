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
import { AnimatePresence, motion } from "motion/react"


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
                        <Link href={"/auth/login"} className='text-primary-blue duration-300 hover:bg-primary-blue hover:text-white  xl:block hidden text-base py-2 px-4  rounded-full border-2 border-primary-blue font-circular'>
                            Log In
                        </Link>


                        <Link href={"/auth/register"} className='text-white text-base py-2 px-4 duration-300  rounded-full hover:bg-cyan-600 bg-primary-blue font-circular'>
                            Sign Up
                        </Link>



                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <div className='hover:bg-gray-100 block xl:hidden p-1.5 rounded-sm cursor-pointer'>
                                    <AlignJustify className='text-gray-600' />
                                </div>
                            </DialogTrigger>

                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        key="dialog"
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        className="fixed left-1/2 top-5 z-[60] w-full max-w-[95%] -translate-x-1/2 rounded-md border bg-white shadow-lg"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-5 py-4">
                                            <Logo />
                                            <DialogClose asChild>
                                                <button className="p-1.5 rounded-md hover:bg-gray-100">
                                                    <X className="text-gray-500" />
                                                </button>
                                            </DialogClose>
                                        </div>

                                        {/* Links */}
                                        <div className="flex flex-col gap-4 px-[2rem]">
                                            {links.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    onClick={() => setOpen(false)}
                                                    className="font-[400] rounded-sm p-2 hover:bg-gray-100 text-black font-circular text-base"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <Link href={"/auth/login"} className="border-t px-5 py-4">
                                            <button className="w-full font-circular hover:bg-cyan-600 bg-primary-blue text-white py-2 rounded-sm">
                                                Log In
                                            </button>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Dialog>


                    </div>
                </div>
            </div>

        </div>



    )
}

export default Navbar