"use client"

import { useUser } from '@/context/userContext'
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import { PiFiles } from 'react-icons/pi'
import { RiPencilFill } from 'react-icons/ri'

const Profile = () => {
    const { state } = useUser()
    const user = state?.user

    const getTimeAgo = (timestamp) => {
        const postTime =
            typeof timestamp === "string"
                ? new Date(timestamp.replace(" ", "T"))
                : new Date(timestamp);

        if (isNaN(postTime.getTime())) return "";

        const day = postTime.getDate().toString().padStart(2, "0");
        const month = (postTime.getMonth() + 1).toString().padStart(2, "0");
        const year = postTime.getFullYear();

        let hours = postTime.getHours();
        const minutes = postTime.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // convert 0 to 12-hour format

        return `${day} / ${month} / ${year} , ${hours}:${minutes} ${ampm}`;
    };

    const [completedProfile, setCompletedProfile] = useState([
        { id: 1, title: 'Add your contact info', completed: true, points: 10 },
        { id: 1, title: 'Add your education journey', completed: false, points: 10 },
        { id: 2, title: 'Add your work experience', completed: false, points: 20 },
        { id: 3, title: 'Add your Resume', completed: false, points: 10 },

        { id: 3, title: 'Add personal links', completed: false, points: 10 },

        { id: 3, title: 'Add skills', completed: false, points: 10 },
    ])
    return (
        <div className='w-full pt-[2.5rem] max-w-hero mx-auto grid grid-cols-4 gap-4'>
            <div className='flex col-span-1 flex-col gap-4'>
                <div className='flex itme-start'>
                    <div className='bg-white p-6  w-full max-w-sm border border-gray-200 rounded-md'>
                        <div className='relative flex flex-col gap-6'>
                            <div className='flex flex-col items-center gap-4'>
                                <div className='size-16 rounded-2xl bg-primary-light flex items-center justify-center'>
                                    <div className='font-circular pt-1 font-medium text-3xl text-white'>
                                        {user?.firstName?.charAt(0).toUpperCase()}
                                        {user?.lastName?.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div>
                                    <div className='font-circular font-semibold text-xl text-text-primary text-center'>{user?.firstName} {user?.lastName}</div>
                                </div>
                            </div>

                            <div className='absolute top-0 right-2 cursor-pointer'>
                                <div className='p-1.5 bg-gray-50 border border-gray-200 rounded-md'>
                                    <RiPencilFill color='gray' />
                                </div>
                            </div>



                        </div>
                    </div>
                </div>


                <div className='flex items-start font-circular'>
                    <div className='bg-white p-6 flex flex-col gap-4 w-full max-w-sm border border-gray-200  rounded-md'>
                        <div className='font-circular font-medium text-sm'>
                            My Profile Strength


                        </div>
                        <div className='flex flex-col gap-2'>

                            <div className='flex items-center gap-2'>
                                <div className='font-circular font-medium text-lg '>
                                    Career Newbie
                                </div>

                                <img src='/images/grad.png' className='size-5' />
                            </div>

                            <div className='text-gray-500 font-normal text-sm'>
                                Complete your profile to autofill job applications effortlessly!

                            </div>
                        </div>


                        <div className='flex items-center gap-2 justify-between'>
                            <div className="w-full h-4 rounded-xl bg-primary-lighter overflow-hidden">
                                <div className="h-full w-10 bg-primary-blue"></div>
                            </div>


                            <div className='text-sm text-primary-blue font-medium'>
                                20%
                            </div>

                        </div>

                        <div className='flex font-circular flex-col gap-4'>
                            {completedProfile.map((item, index) => (
                                <div key={index} className='flex items-center gap-3 text-sm'>
                                    <div className='flex items-center gap-2'>
                                        {item.completed ? (
                                            <FaCheckCircle className='w-4 h-4' />
                                        ) : (
                                            <div className='h-4 w-4 rounded-full border border-gray-400 bg-white'></div>
                                        )}
                                        <div className={item.completed ? 'text-gray-400 line-through' : ''}>{item.title}</div>
                                    </div>
                                    <div className='text-primary-blue font-medium'>
                                        +{item.points} pts
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>


            <div className='bg-white col-span-3 p-6 flex flex-col gap-4  max-w-hero h-fit rounded-md border border-gray-200'>
                <div className='font-medium font-circular text-lg'>
                    Resume
                </div>

                <div className='flex items-center gap-4'>
                    <div className='rounded-lg w-fit p-3 bg-gradient-to-r from-[#84BFF6] to-[#84DCF6]'>
                        <PiFiles className='size-8 text-white' />
                    </div>

                    <div className='flex font-circular  flex-col gap-0'>
                        <div className='font-medium text-base'>
                            {user?.default_resume?.filename || 'No resume uploaded'}
                        </div>

                        <div className='text-sm text-gray-500 font-normal'>
                            Last updated {user?.default_resume ? getTimeAgo(user?.default_resume?.updatedAt) : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile