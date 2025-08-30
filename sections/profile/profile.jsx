"use client"

import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaUserEdit } from 'react-icons/fa'
import { PiFiles } from 'react-icons/pi'
import { RiImageEditFill, RiPencilFill } from 'react-icons/ri'
import ResumeSection from './resumesection'
import ExperienceSection from './experience/experiencesection'
import EducationSection from './education/educationsection'
import ProjectSection from './projects/projectsection'
import Socials from './socials/socials'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import GetCountryCodesApi from '@/apis/user/GetCountryCodesApi'
import toast from 'react-hot-toast'

import { motion, AnimatePresence } from "motion/react";

import UploadProfilePicApi from '@/apis/user/UploadProfilePicApi'
import UpdateUserApi from '@/apis/user/UpdateUser'
import Skills from './skills/skills'
import Languages from './languages/languages'



const Profile = () => {
    const { state, dispatch } = useUser()
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = state?.user
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null);

    const [codes, setCodes] = useState([])


    const getCountryCodes = async () => {
        const res = await GetCountryCodesApi()
        if (res?.error) {
            toast.error(res?.error)
            return;
        }
        setCodes(res?.codes)

    }

    useEffect(() => {
        getCountryCodes()
    }, [])


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                toast.error("Only JPEG and PNG are allowed!");
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };



    const [completedProfile, setCompletedProfile] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!user) return;

        const sections = [
            {
                id: 1,
                title: "Add your contact info",
                completed: Boolean(user?.email && user?.phone),
                points: 10,
            },
            {
                id: 2,
                title: "Add your education journey",
                completed: user?.education?.length > 0,
                points: 10,
            },
            {
                id: 3,
                title: "Add your work experience",
                completed: user?.work?.length > 0,
                points: 20,
            },
            {
                id: 4,
                title: "Add your Resume",
                completed: Boolean(user?.default_resume),
                points: 10,
            },
            {
                id: 5,
                title: "Add personal links",
                completed: user?.soicalLinks?.linkedIn
                    || user?.soicalLinks?.github
                    || user?.soicalLinks?.website,
                points: 10,
            },
            {
                id: 6,
                title: "Add skills",
                completed: user?.skills?.length > 0,
                points: 10,
            },
        ];

        setCompletedProfile(sections);
        const totalPoints = sections.reduce((sum, s) => sum + s.points, 0);
        const earnedPoints = sections
            .filter((s) => s.completed)
            .reduce((sum, s) => sum + s.points, 0);

        let percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

        // round safely, clamp to 100
        percentage = Math.min(100, Math.round(percentage));

        setProgress(percentage);

    }, [user]);


    const handleSubmit = async () => {
        setLoading(true);

        if (image) {
            const res = await UploadProfilePicApi(image);
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
            setLoading(false);
            dispatch({ type: "SET_USER", payload: res?.user });

        }

        const body = {
            firstName,
            lastName,
            phone,
        }
        const res = await UpdateUserApi(body);

        if (res?.error) {
            toast.error(res?.error);
            return;
        }
        dispatch({ type: "SET_USER", payload: res });
        toast.success("Profile updated successfully");
        setEdit(false);
    };





    return (
        <div className='pt-[2.5rem] px-[1rem] w-full max-w-hero mx-auto  grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

            <Dialog open={edit} onOpenChange={setEdit}>
                <DialogTrigger className='hidden'>
                    <span />
                </DialogTrigger>
                <DialogContent zIndex={50} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader>

                        <div className='flex items-center gap-4'>

                            <div className='p-2.5 flex justify-center items-center text-primary-blue rounded-full bg-primary-lighter'>
                                <FaUserEdit className='size-6' />
                            </div>
                            <DialogTitle className={"font-circular font-medium"}>
                                Edit Personal Information
                            </DialogTitle>

                        </div>
                    </DialogHeader>



                    <div className='flex items-center justify-center flex-col gap-4'>


                        <div className="flex items-center flex-col gap-2">
                            {preview ? (
                                <img
                                    src={preview}
                                    className="size-20 rounded-2xl object-center"
                                    alt="Preview"
                                />
                            ) : user?.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    className="size-20 rounded-2xl object-cover"
                                    alt="Profile"
                                />
                            ) : (
                                <div className="size-20 rounded-2xl bg-primary-light flex items-center justify-center">
                                    <div className="font-circular pt-1 font-medium text-3xl text-white">
                                        {user?.firstName?.charAt(0).toUpperCase()}
                                        {user?.lastName?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            )}

                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <RiImageEditFill className="text-primary-blue" />
                                <div className="text-sm text-primary-blue font-medium">Change Photo</div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>


                        <div className='flex flex-col gap-2 w-full'>
                            <Label>
                                First Name
                            </Label>

                            <input
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <Label>
                                Last Name
                            </Label>

                            <input
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <Label>
                                Email Address
                            </Label>

                            <input
                                type='text'
                                readOnly
                                disabled
                                value={user?.email}
                                className="p-3 disabled:bg-gray-50 disabled:text-gray-400 font-circular h-11 w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"
                            />
                        </div>






                        <div className='flex flex-col gap-2 w-full'>
                            <Label>
                                Phone Number
                            </Label>

                            <input
                                type='text'
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9+]/g, ""); // allow only numbers and +
                                    setPhone(value);
                                }}
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"
                            />
                        </div>
                    </div>


                    <div className='flex items-center gap-2 justify-center'>
                        <button disabled={loading} className='w-full text-sm font-circular font-medium duration-300 hover:bg-gray-50 border p-2 rounded-md'>
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            onClick={handleSubmit} className='w-full text-sm border font-circular font-medium hover:bg-cyan-600 duration-300 border-primary-blue bg-primary-blue p-2 text-white rounded-md'>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


            <div className='flex lg:col-span-1 xl:col-span-1  flex-col gap-4'>
                <div className='flex items-start'>
                    <div className='bg-white p-6  w-full border border-gray-200 rounded-md'>
                        <div className='relative flex flex-col gap-6'>
                            <div className='flex flex-col items-center gap-4'>
                                {user?.profilePicture ? (
                                    <img
                                        src={user.profilePicture}


                                        className="w-24 h-24 rounded-2xl object-center"
                                        alt="Profile"
                                    />
                                ) : (
                                    <div className="size-20 rounded-2xl bg-primary-light flex items-center justify-center">
                                        <div className="font-circular pt-1 font-medium text-3xl text-white">
                                            {user?.firstName?.charAt(0).toUpperCase()}
                                            {user?.lastName?.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                )}


                                <div className='flex flex-col items-center gap-1'>
                                    <div className='font-circular font-medium text-lg'>
                                        {user?.firstName} {user?.lastName}
                                    </div>
                                    <div className='text-gray-500 font-normal text-sm'>
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className='absolute top-0 right-2 cursor-pointer'>
                                <div onClick={() => setEdit(!edit)} className='p-1.5 bg-gray-50 border border-gray-200 rounded-md'>
                                    <RiPencilFill color='gray' />
                                </div>
                            </div>



                        </div>
                    </div>
                </div>


                <div className='flex font-circular'>
                    <div className='bg-white p-6 flex flex-col gap-4 w-full border border-gray-200  rounded-md'>
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
                            <div className="w-full h-3 rounded-xl bg-primary-lighter overflow-hidden">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="h-full bg-primary-blue transition-all duration-500 ease-in-out"
                                ></div>
                            </div>



                            <div className='text-sm text-primary-blue font-medium'>
                                {progress}%
                            </div>

                        </div>

                        <div className='flex font-circular flex-col gap-4'>
                            {completedProfile.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <AnimatePresence mode="wait">
                                            {item.completed ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                                                >
                                                    <FaCheckCircle className="w-4 h-4 text-primary-blue" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="circle"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="h-4 w-4 rounded-full border border-gray-400 bg-white"
                                                />
                                            )}
                                        </AnimatePresence>

                                        <div className={item.completed ? "text-gray-400 line-through" : ""}>
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="text-primary-blue font-medium">+{item.points} pts</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>


            {/* All sections  */}

            <div className='lg:col-span-2 xl:col-span-3  pb-10 flex flex-col gap-4'>
                <ResumeSection />
                <ExperienceSection />
                <EducationSection />
                <ProjectSection />
                <Socials />
                <Skills />
                <Languages />
            </div>


        </div>
    )
}

export default Profile