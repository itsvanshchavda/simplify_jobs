"use client"
import React, { useState } from "react"
import { ChevronUp, Plus } from "lucide-react"
import { FaTrashAlt } from "react-icons/fa"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { BsTrashFill } from "react-icons/bs"

const Languages = ({ resume, setResume }) => {
    const [hideLanguages, setHideLanguages] = useState(false)

    const handleAddLanguage = () => {
        const newLang = { language: "New Language", proficiency: "Beginner" }
        setResume(prev => ({
            ...prev,
            parsedLanguages: [...(prev.parsedLanguages || []), newLang],
        }))
        toast.success("New language added!")
    }

    const handleRemoveLanguage = (index) => {
        setResume(prev => ({
            ...prev,
            parsedLanguages: prev.parsedLanguages.filter((_, i) => i !== index),
        }))
        toast.success("Language removed!")
    }

    const handleLanguageChange = (index, key, value) => {
        const updated = [...(resume.parsedLanguages || [])]
        updated[index][key] = value
        setResume(prev => ({ ...prev, parsedLanguages: updated }))
    }

    return (
        <div className="flex p-6 font-circular bg-white border rounded-md flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between cursor-pointer">
                <div className="font-circular font-medium text-2xl text-gray-700">
                    Languages
                </div>

                <div className="flex items-center gap-4">
                    {!hideLanguages && (
                        <div
                            onClick={handleAddLanguage}
                            className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 border border-gray-200 rounded-md"
                        >
                            <div className="font-circular font-medium text-sm text-gray-700">
                                Add Language
                            </div>
                            <Plus className="text-gray-500" size={20} strokeWidth={1} />
                        </div>
                    )}
                    <div
                        onClick={() => setHideLanguages(!hideLanguages)}
                        className={`p-1 border border-gray-100 rounded-md bg-gray-50 transition-transform ${hideLanguages ? "rotate-0" : "-rotate-180"}`}
                    >
                        <ChevronUp className="text-gray-500" strokeWidth={1} />
                    </div>
                </div>
            </div>

            {/* Languages List */}
            {!hideLanguages && (
                <div className="flex flex-col gap-6">
                    {resume?.parsedLanguages?.map((lang, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4"
                        >
                            {/* Language Input */}
                            <div className="flex flex-col gap-3 w-full">
                                <Label>Language</Label>
                                <input
                                    value={lang.language}
                                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"

                                    onChange={(e) =>
                                        handleLanguageChange(index, "language", e.target.value)
                                    }
                                    placeholder="e.g. English"
                                />
                            </div>

                            {/* Proficiency Select */}
                            <div className="flex flex-col gap-3 w-full">
                                <Label>Proficiency</Label>
                                <Select
                                    value={lang.proficiency}
                                    onValueChange={(val) =>
                                        handleLanguageChange(index, "proficiency", val)
                                    }
                                >
                                    <SelectTrigger className="w-full shadow py-[19px]">
                                        <SelectValue placeholder="Select proficiency" />
                                    </SelectTrigger>
                                    <SelectContent className={"font-circular"}>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                        <SelectItem value="Fluent">Fluent</SelectItem>
                                        <SelectItem value="Native">Native</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Delete */}
                            <BsTrashFill
                                color="gray"
                                className="size-9 cursor-pointer mt-6"
                                onClick={() => handleRemoveLanguage(index)}
                            />
                        </div>
                    ))}

                    {/* Empty state */}
                    {(!resume?.parsedLanguages || resume.parsedLanguages.length === 0) && (
                        <div className="bg-gray-50 px-[1rem] flex justify-center items-center p-4 border border-gray-200 rounded-md">
                            <div className="text-gray-500 font-circular font-medium text-sm">
                                No languages added. Click "Add Language" to get started.
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Languages
