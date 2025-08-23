import Logo from '@/public/icons/logo'
import React from 'react'

const Loader = () => {
    return (
        <div className='w-full'>
            <div className="flex justify-center animate-pulse items-center w-full min-h-[100vh]">
                <Logo />
            </div>
        </div>
    )
}

export default Loader