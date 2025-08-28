"use client"
import React, { useState } from 'react'
import UpdatePersonalInfo from './updatesections/updatepersonalinfo'
import Education from './singlesection/education'
import Experience from './singlesection/experience'
import Achievements from './singlesection/achievements'
import Skills from './singlesection/skills'
import Languages from './singlesection/languages'
import Project from './singlesection/projects'
import CustomSections from './singlesection/customsection'

const ResumeForm = ({ setResume, resume }) => {

    const [resumeOrder, setResumeOrder] = useState();
    const handleAddCustomSection = () => {
        setResume((prev) => ({
            ...prev,
            parsedCustomSections: [
                ...(prev.parsedCustomSections || []),
                { title: "New Section", content: "" }
            ]
        }));
    };





    return (
        <div className='w-full flex flex-col gap-4 h-full'>
            <UpdatePersonalInfo setResume={setResume} resum={resume} />

            <Education setResume={setResume} resume={resume} />


            <Experience setResume={setResume} resume={resume} />

            <Project setResume={setResume} resume={resume} />

            <Skills setResume={setResume} resume={resume} />

            <Achievements setResume={setResume} resume={resume} />

            <Languages setResume={setResume} resume={resume} />

            <CustomSections setResume={setResume} resume={resume} />

            <button onClick={handleAddCustomSection} className='bg-primary-blue py-2 px-6 mx-auto rounded-md text-white font-medium font-circular w-fit'>
                Add custom section
            </button>
        </div>
    )
}

export default ResumeForm