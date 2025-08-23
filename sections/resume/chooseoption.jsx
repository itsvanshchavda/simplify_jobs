import React from 'react'

const ChooseOption = () => {
    return (
        <div className='w-full xl:px-0 px-4 h-full'>
            <div className='bg-white border rounded-md mx-auto  max-w-[65rem] py-10 w-full mt-4'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='font-circular   font-medium text-3xl'>
                        How would you like to create this new resume?

                    </div>

                    <div className='font-circular font-normal text-gray-700'>
                        Use an existing resume as base or start from your profile information.



                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseOption