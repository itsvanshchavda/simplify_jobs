"use client"
import React, { useState } from 'react'

import Logo from '@/public/icons/logo'
import Link from 'next/link'
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import { LuMoveLeft } from 'react-icons/lu'

const BasicHeader = () => {

    const { state } = useUser()
    const user = state?.user
    const router = useRouter()



    return (
        <div className='w-full flex px-[1rem] xl:px-[2.5rem] justify-between items-center z-50 sticky top-0 bg-white shadow-sm '>
            <div className='flex gap-9 items-center'>
                <Link href={"/dashboard"}>
                    <div style={{ outline: 'none', boxShadow: 'none' }} className='flex h-[60px]  items-center gap-3'>
                        <Logo size='115' />

                    </div>

                </Link>



            </div>

            {user ? (
                <div onClick={() => router.back()} className='py-1.5 flex items-center gap-3 cursor-pointer px-4 text-white bg-primary-blue font-circular rounded-md'>
                    <LuMoveLeft />
                    Back
                </div>
            ) : (
                <Link href={"/auth/login"} className='py-1.5 px-4 text-white font-circular bg-primary-blue rounded-md'>
                    Log in
                </Link>
            )}







        </div>
    )
}

export default BasicHeader