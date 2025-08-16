"use client";
import ForgotPasswordApi from '@/apis/auth/ForgotPasswordApi';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Required');
            return;
        }

        setLoading(true);
        const res = await ForgotPasswordApi({ email });
        if (res.error) {
            setError(res.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        setEmail('');

        toast.success('Password reset link sent to your email');

    }
    return (
        <div className='min-h-screen flex px-[1rem] bg-gray-50 flex-col justify-center gap-8 items-center  w-full'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <div className='font-circular text-center font-black text-3xl xl:text-5xl '>
                    Need help logging in?

                </div>
                <div className='font-circular text-center text-gray-700 text-base'>
                    Type in your email and we will send you a password reset link.
                </div>
            </div>


            <form onSubmit={handleSubmit} className='flex flex-col  gap-4 shadow w-full max-w-xl bg-white py-8 px-[1rem] md:px-[2.5rem] rounded-md'>
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

                    {error && (
                        <p>
                            <span className='text-red-500 font-circular text-sm'>{error}</span>
                        </p>
                    )}

                </div>



                <button type='submit' className='w-full bg-primary-blue py-2 text-sm rounded-md hover:bg-cyan-700 duration-300 text-white font-medium font-circular '>
                    {loading && (<Loader2 className='animate-spin h-4 w-4 mr-2 inline-block' />)}
                    {loading ? "Sending..." : "Reset Password"}
                </button>

                <div className='font-circular text-gray-700 text-sm'>
                    Don't have an account? <Link href={"/auth/register"} className='font-circular hover:underline cursor-pointer text-primary-blue'>Register</Link>
                </div>


            </form>

            <div className='flex flex-col -space-y-4 items-center justify-center'>
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

export default ForgotPass