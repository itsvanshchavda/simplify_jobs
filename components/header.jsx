"use client"
import React, { useState } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import Logo from '@/public/icons/logo'
import { BookmarkCheck, BriefcaseBusiness, ChevronDown, ClockFading, Cog, Home, LogOut, Menu, MessageCircleQuestionMark, Settings, User, X } from 'lucide-react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useUser } from '@/context/userContext'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = ({ title }) => {

    const { state } = useUser();
    const [open, setOpen] = useState(false)
    const pathname = usePathname();

    const getActiveLink = (link) => {
        return pathname === link ? true : false
    }

    const user = state?.user;

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    }

    const links = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Job Tracker", href: "/dashboard/job-tracker", icon: BriefcaseBusiness },
        { name: "Documents", href: "/dashboard/documents", icon: ClockFading },
        { name: "Saved Jobs", href: "/dashboard/saved-jobs", icon: BookmarkCheck },
        { name: "Profile", href: "/dashboard/profile", icon: User },
    ]

    return (
        <div className='w-full flex px-[1rem] sm:px-[2.5rem] justify-between items-center z-50 sticky top-0 bg-white shadow-sm '>
            <div className='flex gap-9 items-center'>
                <div className='flex h-[60px]  items-center gap-3'>
                    <Logo size='115' />

                </div>


                <div className=' hidden lg:flex items-center gap-11'>
                    {links.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <div className='flex items-center gap-2'>
                                <item.icon size={16} className={`${getActiveLink(item.href) ? "text-black" : "text-gray-500"}`} />
                                <div className={`text-base font-circular cursor-pointer duration-300 hover:text-gray-800 ${getActiveLink(item.href) ? "text-black font-medium" : "text-gray-600"} `}>{item.name}</div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>



            <div className='lg:hidden block'>

                <Sheet >
                    <SheetTrigger>
                        <Menu className='text-gray-500' strokeWidth={2.5} />
                    </SheetTrigger>
                    <SheetContent side='left' className={"py-2 h-full flex flex-col justify-between"}>
                        <SheetHeader className={"hidden"}>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>

                        </SheetHeader>

                        <div className='flex flex-col gap-0'>
                            <div className='border-b px-4  py-2 pb-3 flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <Logo />
                                </div>

                                <SheetClose>
                                    <X />
                                </SheetClose>
                            </div>


                            <div className='flex flex-col  gap-0'>
                                {links.map((item, index) => (
                                    <div key={index} className='relative'>


                                        {pathname === item.href && (
                                            <div className='absolute left-0 top-0 w-1 h-full bg-primary-blue' />
                                        )}

                                        <Link href={item.href} className={`hover:bg-primary-lighter/50 ${getActiveLink(item.href) ? "bg-primary-lighter" : ""} cursor-pointer duration-300 group h-[50px] px-4 flex items-center gap-4`}>
                                            <item.icon className={` ${getActiveLink(item.href) ? "text-primary-blue" : "text-gray-500"} group-hover:text-primary-blue`} />
                                            <div className={`font-circular cursor-pointer duration-300 group-hover:text-primary-blue ${getActiveLink(item.href) ? "text-primary-blue" : "text-gray-600"}`}>{item.name}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>



                        <div className='border-t px-4 flex items-center justify-between py-2'>
                            <div className='flex items-center gap-3'>
                                <div className='flex cursor-pointer items-center gap-2'>
                                    <div className='p-2 rounded-md bg-primary-light'>
                                        <div className='font-circular text-white font-medium text-base'>
                                            {user?.firstName.charAt(0).toUpperCase()}
                                            {user?.lastName.charAt(0).toUpperCase()}
                                        </div>
                                    </div>

                                </div>

                                <div className='font-medium text-gray-700 font-circular'>
                                    {user?.firstName} {user?.lastName}
                                </div>
                            </div>
                            <div className='flex cursor-pointer items-center gap-3 text-gray-700'>
                                <Cog />
                                <LogOut onClick={handleLogout} />
                            </div>
                        </div>



                    </SheetContent>
                </Sheet>

            </div>



            <div className='lg:flex hidden'>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger style={{ outline: "none", boxShadow: "none" }}>

                        <div className=' hidden lg:flex cursor-pointer items-center gap-2'>
                            <div className='p-2 rounded-md bg-primary-blue/80'>
                                <div className='font-circular text-white font-medium text-base'>
                                    {user?.firstName.charAt(0).toUpperCase()}
                                    {user?.lastName.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            <ChevronDown strokeWidth={0.8} size={23} className={`cursor-pointer duration-300 ${open ? "rotate-180" : ""}`} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-[150px]  mt-1 flex flex-col gap-1 mx-10"} align="start">
                        <DropdownMenuItem className={"flex hover:bg-gray-100 duration-300 cursor-pointer rounded-md items-center gap-2 text-base font-circular font-normal text-gray-700"}>
                            <User fill='black' stroke='black' className='size-6' />
                            Profile
                        </DropdownMenuItem>


                        <DropdownMenuItem className={"flex hover:bg-gray-100 duration-300 cursor-pointer rounded-md items-center gap-2 text-base font-circular font-normal text-gray-700 "}>
                            <Cog className='size-6' stroke='black' />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleLogout} className={"flex hover:bg-gray-100 duration-300 cursor-pointer rounded-md items-center gap-2 text-base font-circular font-normal text-gray-700"}>
                            <LogOut className='size-6' stroke='black' />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default Header