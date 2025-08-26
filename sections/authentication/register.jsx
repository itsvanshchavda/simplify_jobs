"use client";
import Logo from '@/public/icons/logo'
import React, { useEffect, useState } from 'react'
import { AvatarCircles } from './avatarcircles'
import { Label } from '@/components/ui/label';
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
import RegisterApi from '@/apis/auth/RegisterApi';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateInputs = () => {
        let valid = true;
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "Required";
            valid = false;
        }
        if (!lastName.trim()) {
            newErrors.lastName = "Required";
            valid = false;
        }
        if (!email.trim()) {
            newErrors.email = "Required";
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
                valid = false;
            }
        }
        if (!password.trim()) {
            newErrors.password = "Required";
            valid = false;
        } else {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                newErrors.password = "Password must be 8+ chars with a letter & number";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };


    useEffect(() => {
        const newErrors = { ...errors };

        if (firstName) newErrors.firstName = false;
        if (lastName) newErrors.lastName = false;
        if (email) newErrors.email = false;
        if (password) newErrors.password = false;

        setErrors(newErrors);
    }, [firstName, lastName, email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const body = { firstName, lastName, email, password };
            const res = await RegisterApi(body);

            if (res?.error) {
                toast.error(res.error);
                return;
            }

            toast.success("Register successful");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            router.push("/auth/login");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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

    const googleAuth = async () => {
        window.location.href = "http://localhost:5000/api/v1/auth/google";

    }



    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-6  min-h-screen'>
            {/* Left Panel */}
            <div className='hidden  lg:flex col-span-3 bg-[#F0FCFF] flex-col justify-center items-center'>
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

                            <div className="grid gap-2 grid-cols-4">
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

            <div className='flex xl:p-0 lg:p-4 pt-[4rem] px-[2rem] col-span-3 w-full max-w-md mx-auto flex-col lg:justify-center gap-6'>
                {/* Mobile header */}
                <div className='flex lg:hidden flex-col gap-6 justify-center items-center'>
                    <Logo />
                    <div className='flex flex-col gap-4'>
                        <div className='font-circular text-center font-semibold text-3xl'>
                            Apply to jobs in 1-click.
                        </div>
                        <div className='font-circular text-center text-gray-600'>
                            Power your entire job search, with our recruiter-approved AI.
                        </div>
                    </div>
                </div>

                {/* Desk header */}
                <div className='font-circular hidden lg:block text-center font-medium text-3xl'>
                    Sign up for an account

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                    <div className='flex flex-col gap-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            {/* First Name */}
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>First Name</Label>
                                <input
                                    placeholder="First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={clsx(
                                        "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                        {
                                            "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.firstName,
                                            "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.firstName,
                                        }
                                    )}
                                />

                                {errors.firstName && (
                                    <p>
                                        <span className='text-red-500 font-circular text-sm'>{errors.firstName}</span>
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>Last Name</Label>
                                <input
                                    placeholder="Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={clsx(
                                        "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                        {
                                            "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.lastName,
                                            "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.lastName,
                                        }
                                    )}
                                />

                                {errors.lastName && (
                                    <p>
                                        <span className='text-red-500 font-circular text-sm'>{errors.lastName}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className='grid xl:grid-cols-1 grid-cols-2 gap-4'>
                            <div className='flex font-circular flex-col gap-2'>
                                <Label>Email Address</Label>
                                <input
                                    placeholder="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={clsx(
                                        "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                        {
                                            "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.email,
                                            "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.email,
                                        }
                                    )}
                                />

                                {errors.email && (
                                    <p>
                                        <span className='text-red-500 font-circular text-sm'>{errors.email}</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex relative font-circular flex-col gap-2">
                                <Label>Password</Label>



                                {/* Input wrapper */}
                                <div className="relative">
                                    <input
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={clsx(
                                            "p-3 font-circular h-12 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                            {
                                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.password,
                                                "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.password,
                                            }
                                        )}
                                    />

                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                                    </div>
                                </div>

                                {errors.password && (
                                    <p>
                                        <span className="text-red-500 font-circular text-sm">{errors.password}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>


                    <div className='font-circular text-gray-700 text-sm'>
                        By signing up you agree to our <span className='text-primary-blue'>Terms and Condition</span> and <span className='text-primary-blue'>Privacy Policy.</span>

                    </div>

                    {/* Buttons */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-primary-blue py-3 rounded-full hover:bg-cyan-700 duration-300 text-white font-medium font-circular'
                    >
                        {loading && (<Loader2 className='animate-spin h-4 w-4 mr-2 inline-block' />)}

                        {loading ? "Signing up..." : "Sign up"}
                    </button>

                    <div className='font-circular text-gray-700 text-sm'>
                        Already have an account? <Link href={"/auth/login"} className='font-circular hover:underline cursor-pointer text-primary-blue'>Login</Link>
                    </div>

                    <div className="flex items-center gap-3 w-full">
                        <hr className="flex-1 border-gray-400" />
                        <span className="text-sm text-gray-500 font-circular">Or register in with</span>
                        <hr className="flex-1 border-gray-400" />
                    </div>

                    {/* Social Buttons */}
                    <div onClick={googleAuth}>
                        <button
                            type='button'
                            className="h-12 px-6 flex flex-col justify-center items-center w-full border border-gray-300 rounded-full transition duration-300"
                        >
                            <div className="w-full flex items-center gap-2 justify-center">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6 w-6" alt="google logo" />
                                <span className="block leading-none font-circular font-medium tracking-wide text-gray-700 !text-[14px] transition duration-300  sm:text-base">
                                    Continue with Google
                                </span>
                            </div>
                        </button>
                    </div>

                    <div>
                        <button
                            type='button'
                            className="group flex flex-col justify-center items-center h-12 px-6 w-full border border-gray-300 rounded-full transition duration-300"
                        >
                            <div className="w-full flex items-center gap-2 justify-center">
                                <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-8 w-8" alt="linkedin logo" />
                                <span className="block leading-none font-circular font-medium tracking-wide text-gray-700 !text-[14px] transition duration-300 sm:text-base">
                                    Continue with Linkedin
                                </span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
