import { Label } from '@/components/ui/label'
import React from 'react'
import UpdatePersonalInfo from './updatesections/updatepersonalinfo'

const ResumeForm = ({ setResume, resume }) => {





    return (
        <div className='w-full h-full'>
            <UpdatePersonalInfo setResume={setResume} resum={resume} />
        </div>
    )
}

export default ResumeForm