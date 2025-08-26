"use client"
import React, { useState } from 'react'
import Logo from '@/public/icons/logo'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LuFileCheck } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from 'lucide-react'
import { IoMdSearch } from "react-icons/io";

import { IoTrashOutline } from "react-icons/io5";




const EditorHeader = ({ savedtime }) => {

    const getTimeAgo = (timestamp) => {
        const postTime = new Date(timestamp);
        const now = new Date();

        const diff = Math.floor((now - postTime) / 1000); // seconds

        if (diff < 60) return `${diff} sec ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)} day ago`;
        if (diff < 31536000) return `${Math.floor(diff / 2592000)} month ago`;
        return `${Math.floor(diff / 31536000)} yr ago`;
    };


    const handleBack = () => {
        window.history.back();
    }



    return (
        <div className='w-full  flex px-[1rem] xl:px-[2.5rem] justify-between lg:items-center z-50 sticky top-0 bg-white shadow-sm '>
            <div className='flex gap-9 items-center'>
                <div className='cursor-pointer' onClick={handleBack}>
                    <div style={{ outline: 'none', boxShadow: 'none' }} className='flex h-[60px]  items-center gap-3'>
                        <Logo size='115' />

                    </div>

                </div>



            </div>


            <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                    < LuFileCheck color='gray' />

                    <div className='font-circular text-gray-500 text-sm font-medium'>
                        Saved {getTimeAgo(savedtime)}
                    </div>
                </div>


                <DropdownMenu>
                    <DropdownMenuTrigger>

                        <div className='flex border text-sm px-4 py-1.5 border-primary-blue text-primary-blue font-circular font-medium rounded-md items-center gap-2'>
                            <HiOutlineUsers className='' />
                            <span className='hidden sm:block'>Share</span>
                        </div>

                    </DropdownMenuTrigger>
                    {/* pending  */}
                    <DropdownMenuContent className={"w-[200px] fkex flex-col gap-4 font-circular mx-5"}>
                        <DropdownMenuItem>
                            Sharing off
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                <div className='hidden sm:flex border text-sm px-4 py-1.5 bg-primary-blue text-white font-circular font-medium rounded-md items-center gap-2'>
                    <MdOutlineFileDownload className='size-4' />
                    Export
                </div>



                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className='flex border text-sm px-2 py-1.5 bg-white  text-primary-blue border-primary-blue font-circular font-medium rounded-md items-center gap-2'>
                            <IoMenu className='size-4' />
                            <span className='sm:block hidden'>Menu</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-[200px] fkex flex-col gap-4 font-circular mx-5"}>

                        <DropdownMenuItem>
                            <Plus />
                            Create Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IoMdSearch />
                            Search Resumes
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <IoTrashOutline />
                            Delete Resume
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <MdOutlineFileDownload />
                            Download Resume
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>




        </div>
    )
}

export default EditorHeader