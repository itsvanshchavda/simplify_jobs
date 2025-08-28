"use client"
import React, { useState } from 'react'
import { ChevronUp, Plus, X } from 'lucide-react'
import { FaTrashAlt } from "react-icons/fa"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { BsTrashFill } from 'react-icons/bs'

const Skills = ({ setResume, resume }) => {

    const [hideSkills, setHideSkills] = useState(false)


    const handleAddGroup = () => {
        const newGroup = { heading: "New Category", skills: [] }
        setResume(prev => ({
            ...prev,
            parsedSkills: [...(prev.parsedSkills || []), newGroup],
        }))
        toast.success("New skill group added!")
    }

    const handleRemoveGroup = (index) => {
        setResume(prev => ({
            ...prev,
            parsedSkills: prev.parsedSkills.filter((_, i) => i !== index),
        }))
        toast.success("Skill group removed!")
    }

    // ✅ Update heading
    const handleHeadingChange = (index, value) => {
        const updated = [...(resume.parsedSkills || [])]
        updated[index].heading = value
        setResume(prev => ({ ...prev, parsedSkills: updated }))
    }

    const handleAddSkill = (index, skill) => {
        if (!skill.trim()) return
        const updated = [...(resume.parsedSkills || [])]
        updated[index].skills.push(skill.trim())
        setResume(prev => ({ ...prev, parsedSkills: updated }))
    }

    // ✅ Remove skill
    const handleRemoveSkill = (groupIndex, skillIndex) => {
        const updated = [...(resume.parsedSkills || [])]
        updated[groupIndex].skills = updated[groupIndex].skills.filter((_, i) => i !== skillIndex)
        setResume(prev => ({ ...prev, parsedSkills: updated }))
    }

    return (
        <div className="flex p-6 font-circular  bg-white border rounded-md flex-col gap-6">
            <div className="flex items-center justify-between cursor-pointer">
                <div className="font-circular font-medium text-2xl text-gray-700">
                    Skills
                </div>

                <div className="flex items-center gap-4">
                    {!hideSkills && (
                        <div
                            onClick={handleAddGroup}
                            className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 border border-gray-200 rounded-md"
                        >
                            <div className="font-circular font-medium text-sm text-gray-700">Add Group</div>
                            <Plus className="text-gray-500" size={20} strokeWidth={1} />
                        </div>
                    )}
                    <div onClick={() => setHideSkills(!hideSkills)} className={`p-1 border border-gray-100 rounded-md bg-gray-50 transition-transform ${hideSkills ? "rotate-0" : "-rotate-180"}`}>
                        <ChevronUp className='text-gray-500' strokeWidth={1} />
                    </div>
                </div>
            </div>

            {/* Groups */}

            {!hideSkills && (
                <div className="flex flex-col gap-6">
                    {resume?.parsedSkills?.map((group, gIndex) => (
                        <div key={gIndex} className="flex flex-col gap-4 p-4">
                            {/* Heading + Delete */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex  flex-col gap-2 w-full">
                                    <Label>Category</Label>
                                    <input
                                        type="text"
                                        value={group.heading}
                                        onChange={(e) => handleHeadingChange(gIndex, e.target.value)}
                                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                                    />
                                </div>
                                <BsTrashFill
                                    color="gray"
                                    className="size-4 cursor-pointer mt-6"
                                    onClick={() => handleRemoveGroup(gIndex)}
                                />
                            </div>


                            <input
                                type="text"
                                placeholder="Add a skill and press Enter"
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        handleAddSkill(gIndex, e.target.value)
                                        e.target.value = ""
                                    }
                                }}
                            />


                            {/* Skills list */}
                            <div className="flex px-10 bg-gray-50 border p-4 border-dashed rounded-md justify-center items-center mx-auto flex-wrap gap-2 min-h-[40px] w-full">
                                {group?.skills?.length > 0 ? (
                                    <>
                                        {group.skills.map((skill, sIndex) => (
                                            <div
                                                key={sIndex}
                                                className="flex text-white font-circular bg-primary-light p-1 px-2.5 rounded-xl items-center gap-1"
                                            >
                                                <div className="text-sm">{skill}</div>
                                                <X
                                                    size={16}
                                                    className="cursor-pointer"
                                                    onClick={() => handleRemoveSkill(gIndex, sIndex)}
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="text-gray-500 font-circular font-medium text-sm">
                                        No skills in this group. Add a skill below.
                                    </div>
                                )}
                            </div>

                            {/* Add new skill input */}

                        </div>
                    ))}

                    {/* Empty state */}
                    {(!resume?.parsedSkills || resume.parsedSkills.length === 0) && (
                        <div className="bg-gray-50 px-[1rem] flex justify-center items-center p-4 border border-gray-200 rounded-md">
                            <div className="text-gray-500 font-circular font-medium text-sm">
                                No skills added. Click "Add Group" to get started.
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default Skills
