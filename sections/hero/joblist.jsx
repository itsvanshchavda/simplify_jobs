import Highlight from '@/components/highlight'
import React from 'react'

const JobList = () => {
    return (
        <div className='w-full bg-[#F0FCFF] flex flex-col gap-8  py-20 px-4'>


            <div className='w-full flex  gap-5 md:gap-8 flex-col justify-center items-center'>
                <div className=' text-5xl xl:text-6xl font-circular text-black/85 font-black text-center'>
                    Explore our <span className=' block sm:flex gap-3'> <Highlight title={"expert-curated"} /> job lists. </span>
                </div>

                <div className='text-center font-circular w-[99%] max-w-3xl font-normal text-xl'>
                    Our team handpicks the most exciting opportunities into lists for you to discover - updated daily.
                </div>
            </div>
        </div>
    )
}

export default JobList