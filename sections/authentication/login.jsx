"use client";
import Logo from '@/public/icons/logo'
import React, { useEffect, useState } from 'react'
import { AvatarCircles } from './avatarcircles'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, HelpCircle, Loader2 } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import LoginApi from '@/apis/auth/LoginApi';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email) {
            setEmailError("Required");
        }

        if (!password) {
            setPasswordError("Required");
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password) && password) {
            toast.error("Password must be 8+ chars with a letter & number");
            setPasswordError(true);
            return;
        }



        setLoading(true);
        const res = await LoginApi({ email, password });

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Login successful");
            setEmail("");
            setPassword("");
        }

        setLoading(false);
    };



    const logos = [
        "/images/airbnb.png",
        "/images/notion.png",
        "/images/spotify.png",
        "/images/stripe.png",
        "/images/slack.png",
        "/images/visa.png",
        "/images/netflix.png",
        "/images/openai.png",
    ];





    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-6  min-h-screen' >
            <div className=' hidden pt-[1rem] lg:flex col-span-3 bg-[#F0FCFF] flex-col  justify-center items-center'>
                <div className='flex px-[2.5rem] xl:p-12 flex-col gap-8 xl:gap-20 items-start'>
                    <Link href={"/"}>
                        <Logo />
                    </Link>
                    <div className='flex flex-col gap-8'>

                        <div className='tracking-wide'>
                            <div className='font-circular leading-[40px] xl:leading-[60px] text-3xl font-bold'>
                                Apply to jobs in 1-click.

                            </div>

                            <div className='font-circular max-w-[450px] leading-[45px] xl:leading-[50px] text-3xl font-bold'>
                                Power your entire job search, with our recruiter-approved AI.
                            </div>
                        </div>

                        <div className='flex flex-col gap-11'>
                            <div className='flex flex-col gap-0'>

                                <div className='font-circular font-medium text-xl'>
                                    Browse handpicked jobs from the best companies

                                </div>

                                <div className='flex items-center gap-1 font-circular text-lg'>
                                    <AvatarCircles />
                                    Trusted by 1,000,000+ job seekers
                                </div>
                            </div>

                            <div className="grid gap-2  grid-cols-4">


                                {logos.map((logo, index) => (
                                    <div key={index} className="bg-white rounded-xl px-5 py-[1rem] flex items-center justify-center">
                                        <img src={logo} height={70} width={70} className="object-contain" alt={`logo-${index}`} />
                                    </div>
                                ))}



                            </div>
                        </div>




                    </div>

                </div>
            </div>


            <div className='flex xl:p-0 lg:p-4  pt-[4rem] px-[2rem] col-span-3  w-full max-w-md mx-auto flex-col lg:justify-center xl:gap-10 gap-6'>

                {/* Mobile header  */}

                <div className='flex lg:hidden flex-col gap-6 justify-center items-center'>
                    <Logo />

                    <div className='flex flex-col gap-4'>
                        <div className='font-circular  text-center font-semibold text-3xl'>
                            Apply to jobs in 1-click.

                        </div>

                        <div className='font-circular text-center text-gray-600'>
                            Power your entire job search, with our recruiter-approved AI.
                        </div>
                    </div>

                </div>

                {/* Desk header  */}
                <div className='font-circular hidden lg:block text-center font-medium text-3xl'>
                    Login to your account

                </div>


                <form onSubmit={handleSubmit} className='flex flex-col gap-4 xl:gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>
                                    Email Address
                                </Label>

                                <input
                                    placeholder="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) setEmailError('');
                                    }}
                                    className={clsx(
                                        "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                        {
                                            "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !emailError,
                                            "border border-red-500 focus:border-red-500 focus:ring-red-200": emailError,
                                        }
                                    )}
                                />

                                {emailError && (
                                    <p>
                                        <span className='text-red-500 font-circular text-sm'>{emailError}</span>
                                    </p>
                                )}

                            </div>


                            <div className="flex flex-col gap-1 font-circular relative">

                                <div className='flex items-center justify-between '>
                                    <Label>Password</Label>

                                    <Link href={"/auth/forgot-password"} className='font-circular text-sm font-medium text-primary-blue cursor-pointer'>
                                        Forgot your Password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (passwordError) setPasswordError('');
                                        }}
                                        className={clsx(
                                            "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                            {
                                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10":
                                                    !passwordError,
                                                "border border-red-500 focus:border-red-500 focus:ring-red-500/10":
                                                    passwordError,
                                            }
                                        )}
                                    />

                                    {/* toggle icon stays inside input */}
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                                    </div>
                                </div>

                                {passwordError && (
                                    <span className="text-red-500 font-circular text-sm">{passwordError}</span>
                                )}

                            </div>

                        </div>


                        <div className='flex items-center gap-2'>
                            <Checkbox
                                className="data-[state=checked]:bg-[#3EC0DD] data-[state=checked]:border-[#3EC0DD] data-[state=checked]:text-white"
                            />

                            <div className='font-circular text-sm text-gray-700 font-normal'>
                                Remember this device
                            </div>


                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle size={17} />
                                </TooltipTrigger>
                                <TooltipContent variant='gray' className="max-w-[450px] pl-4 pr-4 py-2 ">
                                    <div className="text-sm font-circular">
                                        Check this box if you are using a trusted device, like <br />
                                        your personal computer or mobile phone.
                                    </div>
                                </TooltipContent>
                            </Tooltip>


                        </div>

                        <button type='submit' className='w-full bg-primary-blue py-3  rounded-full hover:bg-cyan-700 duration-300 text-white font-medium font-circular '>
                            {loading && (<Loader2 className='animate-spin h-4 w-4 mr-2 inline-block' />)}
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <div className='font-circular  text-gray-700 text-sm'>
                            Don't have an account? <Link href={"/auth/register"} className='font-circular hover:underline cursor-pointer text-primary-blue'>Register</Link>
                        </div>

                        <div className="flex items-center gap-3 w-full">
                            <hr className="flex-1 border-gray-400" />
                            <span className="text-sm text-gray-500 font-circular ">Or log in with</span>
                            <hr className="flex-1 border-gray-400" />
                        </div>

                        <div>
                            <button
                                type='button'
                                className="h-12 px-6 flex flex-col justify-center items-center w-full border border-gray-300 rounded-full transition duration-300 ">
                                <div className=" w-full flex items-center gap-2 justify-center">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        className="h-6 w-6" alt="google logo" />
                                    <span
                                        className="block leading-none font-circular font-medium tracking-wide text-gray-700 dark:text-white !text-[14px] transition duration-300  sm:text-base">Continue
                                        with Google
                                    </span>
                                </div>
                            </button>
                        </div>


                        <div>
                            <button
                                type='button'
                                className="group flex flex-col justify-center items-center h-12 px-6 w-full border border-gray-300 rounded-full transition duration-300 ">
                                <div className=" w-full flex items-center gap-2 justify-center">
                                    <img src="https://www.svgrepo.com/show/448234/linkedin.svg"
                                        className="h-8 w-8" alt="google logo" />
                                    <span
                                        className="block leading-none font-circular font-medium tracking-wide text-gray-700 dark:text-white !text-[14px] transition duration-300 sm:text-base">Continue
                                        with Linkedin
                                    </span>
                                </div>
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        </div >
    )
}

export default Login