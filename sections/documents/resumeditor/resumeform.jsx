import React from 'react'
import UpdatePersonalInfo from './updatesections/updatepersonalinfo'
import Education from './singlesection/education'
import Experience from './singlesection/experience'
import Achievements from './singlesection/achievements'
import Skills from './singlesection/skills'
import Languages from './singlesection/languages'
import Project from './singlesection/projects'

const ResumeForm = ({ setResume, resume }) => {





    return (
        <div className='w-full flex flex-col gap-4 h-full'>
            <UpdatePersonalInfo setResume={setResume} resum={resume} />

            <Education setResume={setResume} resume={resume} />


            <Experience setResume={setResume} resume={resume} />

            <Project setResume={setResume} resume={resume} />

            <Skills setResume={setResume} resume={resume} />

            <Achievements setResume={setResume} resume={resume} />

            <Languages setResume={setResume} resume={resume} />
        </div>
    )
}

export default ResumeForm