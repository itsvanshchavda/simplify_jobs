import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import React, { useState, useEffect } from 'react';
import SelectDate from './selectdate';
import TipTapEditor from '@/components/tiptapeditor';
import { Button } from '@/components/ui/button';

const UpdateExperience = ({ setResume, resume, experienceIndex }) => {


    const experienceData = resume?.parsedExperience?.[experienceIndex] || [];
    console.log("🚀 ~ UpdateExperience ~ experienceData:", experienceData)

    const handleFieldChange = (field, value) => {
        setResume((prevResume) => {
            const updatedExperience = [...(prevResume.parsedExperience || [])];

            if (field.includes('.')) {
                // Handle nested fields like startDate.month
                const [parent, child] = field.split('.');
                updatedExperience[experienceIndex] = {
                    ...updatedExperience[experienceIndex],
                    [parent]: {
                        ...updatedExperience[experienceIndex][parent],
                        [child]: value,
                    },
                };
            } else {
                // Handle direct fields
                updatedExperience[experienceIndex] = {
                    ...updatedExperience[experienceIndex],
                    [field]: value,
                };
            }

            return {
                ...prevResume,
                parsedExperience: updatedExperience,
            };
        });
    };



    useEffect(() => {
        if (!resume?.parsedExperience || resume.parsedExperience.length === 0) {
            setResume((prevResume) => ({
                ...prevResume,
                parsedExperience: [
                    {
                        title: "",
                        company: "",
                        location: "",
                        startDate: { month: "", year: "" },
                        endDate: { month: "", year: "" },
                        present: false,
                        description: "",
                    },
                ],
            }));
        }
    }, []);






    const handlePresentChange = (checked) => {
        setResume((prevResume) => {
            const updatedEducation = [...(prevResume.parsedExperience || [])];
            updatedEducation[experienceIndex] = {
                ...updatedEducation[experienceIndex],
                present: checked,
                endDate: checked
                    ? { month: "Present", year: "" }
                    : { month: "", year: "" },
            };

            return {
                ...prevResume,
                parsedExperience: updatedEducation,
            };
        });
    };



    // Handle description change
    const handleDescriptionChange = (index, content) => {
        handleFieldChange('description', content);
    };

    // Add description
    const handleAddDescription = (index) => {
        handleFieldChange('description', '<p>Start typing your job description here...</p>');
    };

    // Clear description
    const handleClearDescription = (index) => {
        handleFieldChange('description', '');
    };


    return (
        <div className='px-[2rem] font-circular flex flex-col gap-6 py-2 w-full'>
            {/* School */}
            <div className='flex flex-col gap-2'>
                <Label>Title</Label>
                <input
                    type="text"
                    value={experienceData.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                />
            </div>


            <div>
                <Label className="text-sm font-medium">Job Description</Label>

                {!experienceData.description || experienceData.description === "" ? (
                    <div className="mt-3">
                        <Button
                            onClick={() => handleAddDescription(experienceIndex)}
                            variant="outline"
                            className="w-full rounded-lg border-dashed border-2 hover:border-primary-green transition-colors"
                        >
                            + Add Description
                        </Button>
                    </div>
                ) : (
                    <div className="pt-1 space-y-2">
                        <TipTapEditor
                            className="bg-white  focus-within:border-primary-green"
                            content={
                                Array.isArray(experienceData.description)
                                    ? experienceData.description.join(" ")
                                    : experienceData.description
                            }
                            onChange={(content) => handleDescriptionChange(experienceIndex, content)}
                            placeholder="Describe your role, responsibilities, and achievements..."
                            autoFocus={true}
                        />

                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                                Tip: Use bullet points to highlight key achievements
                            </p>
                            <Button
                                onClick={() => handleClearDescription(experienceIndex)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                )}
            </div>



            {/* Degree + Field */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
                <div className='flex flex-col gap-2'>
                    <Label>Company Name</Label>
                    <input
                        type="text"
                        value={experienceData.company || ''}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        placeholder="e.g., Google"
                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                    />
                </div>


                <div className='flex flex-col gap-2'>
                    <Label>Location</Label>
                    <input
                        type="text"
                        value={experienceData.location || ''}
                        onChange={(e) => handleFieldChange('location', e.target.value)}
                        placeholder="e.g., Bhavnagar, Gujarat"
                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                    />
                </div>

            </div >



            {/* Dates */}

            <SelectDate
                sectionData={experienceData}
                handleFieldChange={handleFieldChange}
                handlePresentChange={handlePresentChange}
                title="I currently working here"
            />
        </div >
    );
};

export default UpdateExperience;
