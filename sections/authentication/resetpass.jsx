"use client";
import ResetPasswordApi from '@/apis/auth/ResetPasswordApi';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ResetPass = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError("Both fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }


        if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password) && password) {
            setError("Password must be at least 8 characters long and contain both letters and numbers");
            return;
        }

        setLoading(true);
        const res = await ResetPasswordApi({ email, token, password });
        if (res.error) {
            setError(res.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        setPassword('');
        setConfirmPassword('');

        toast.success('Password has been reset successfully');
    };

    return (
        <div className='min-h-screen px-[1rem] flex bg-gray-50 flex-col justify-center gap-8 items-center w-full'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <div className='font-circular text-center font-black text-3xl xl:text-5xl '>
                    Reset your password
                </div>
                <div className='font-circular text-gray-700 text-base'>
                    Enter a new password to reset your account.


                </div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 shadow w-full max-w-xl bg-white py-8 px-[1rem] md:px-[2.5rem] rounded-md'>
                <div className='flex relative font-circular flex-col gap-2'>
                    <Label>Password</Label>
                    <input
                        placeholder="New Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError('');
                        }}
                        className={clsx(
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                            {
                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !error,
                                "border border-red-500 focus:border-red-500 focus:ring-red-200": error,
                            }
                        )}
                    />

                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 pt-1 top-10 -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                    </div>
                </div>

                <div className='flex relative font-circular flex-col gap-2'>
                    <Label>Confirm Password</Label>
                    <input
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (error) setError('');
                        }}
                        className={clsx(
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                            {
                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !error,
                                "border border-red-500 focus:border-red-500 focus:ring-red-200": error,
                            }
                        )}
                    />

                    <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute pt-1 right-3 top-10 -translate-y-1/2 cursor-pointer"
                    >
                        {showConfirmPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                    </div>
                </div>

                {error && (
                    <p>
                        <span className='text-red-500 font-circular text-sm'>{error}</span>
                    </p>
                )}



                <button type='submit' className='w-full bg-primary-blue py-2 text-sm rounded-md hover:bg-cyan-700 duration-300 text-white font-medium font-circular '>
                    {loading && (<Loader2 className='animate-spin h-4 w-4 mr-2 inline-block' />)}
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className='font-circular text-gray-700 text-sm'>
                    Remembered your password? <Link href={"/auth/login"} className='font-circular hover:underline cursor-pointer text-primary-blue'>Login</Link>
                </div>
            </form>

            <div className='flex flex-col -space-y-3  md:-space-y-4 items-center justify-center'>
                <div className='font-circular text-center text-base font-black text-gray-500'>
                    Jobs from thousands of companies and employers.

                </div>

                <div className='flex items-center gap-8'>
                    <img src='/images/netflix.svg' className='block  md:size-24 size-16' />
                    <img src='/images/medium.svg' className='block md:size-24 size-16' />
                    <img src='/images/atlassian.svg' className='block md:size-24 size-16' />
                    <img src='/images/palantir.svg' className='block md:size-24 size-16' />
                </div>
            </div>
        </div>
    )
}

export default ResetPass;
