"use client"
import React, { useState } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import Logo from '@/public/icons/logo'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const BasicHeader = () => {



    return (
        <div className='w-full flex px-[1rem] xl:px-[2.5rem] justify-between items-center z-50 sticky top-0 bg-white shadow-sm '>
            <div className='flex gap-9 items-center'>
                <Link href={"/dashboard"}>
                    <div style={{ outline: 'none', boxShadow: 'none' }} className='flex h-[60px]  items-center gap-3'>
                        <Logo size='115' />

                    </div>

                </Link>



            </div>




        </div>
    )
}

export default BasicHeader