import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from 'react';
import SelectDate from './selectdate';

const UpdateEducation = ({ setResume, resume, educationIndex }) => {


    const educationData = resume?.parsedEducation?.[educationIndex] || [];

    const handleFieldChange = (field, value) => {
        setResume((prevResume) => {
            const updatedEducation = [...(prevResume.parsedEducation || [])];

            if (field.includes('.')) {
                // Handle nested fields like startDate.month
                const [parent, child] = field.split('.');
                updatedEducation[educationIndex] = {
                    ...updatedEducation[educationIndex],
                    [parent]: {
                        ...updatedEducation[educationIndex][parent],
                        [child]: value,
                    },
                };
            } else {
                // Handle direct fields
                updatedEducation[educationIndex] = {
                    ...updatedEducation[educationIndex],
                    [field]: value,
                };
            }

            return {
                ...prevResume,
                parsedEducation: updatedEducation,
            };
        });
    };


    // // load if editing
    // useEffect(() => {
    //     if (educationIndex !== null && resume?.parsedEducation?.[educationIndex]) {
    //         setFormData(resume.parsedEducation[educationIndex]);
    //     }
    // }, [educationIndex, resume]);

    useEffect(() => {
        if (!resume?.parsedEducation || resume.parsedEducation.length === 0) {
            setResume((prevResume) => ({
                ...prevResume,
                parsedEducation: [
                    {
                        school: "",
                        location: "",
                        degree: "",
                        fieldOfStudy: "",
                        startDate: {
                            month: "",
                            year: "",
                        },
                        endDate: {
                            month: "",
                            year: "",
                        },
                        present: false,
                        description: "",
                    },
                ],
            }));
        }
    }, []);

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i + 10);




    const handlePresentChange = (checked) => {
        setResume((prevResume) => {
            const updatedEducation = [...(prevResume.parsedEducation || [])];
            updatedEducation[educationIndex] = {
                ...updatedEducation[educationIndex],
                present: checked,
                endDate: checked
                    ? { month: "Present", year: "" }
                    : { month: "", year: "" },
            };

            return {
                ...prevResume,
                parsedEducation: updatedEducation,
            };
        });
    };

    return (
        <div className='px-[2rem] font-circular flex flex-col gap-6 py-2 w-full'>
            {/* School */}
            <div className='flex flex-col gap-2'>
                <Label>School Name</Label>
                <input
                    type="text"
                    value={educationData.school || ''}
                    onChange={(e) => handleFieldChange('school', e.target.value)}
                    placeholder="e.g., Sir Bhavsinhji Polytechnic Institute"
                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                />
            </div>

            {/* Degree + Field */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label>Degree</Label>
                    <input
                        type="text"
                        value={educationData.degree || ''}
                        onChange={(e) => handleFieldChange('degree', e.target.value)}
                        placeholder="e.g., Diploma In IT"
                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Field of Study</Label>
                    <input
                        type="text"
                        value={educationData.fieldOfStudy || ''}
                        onChange={(e) => handleFieldChange('fieldOfStudy', e.target.value)}
                        placeholder="e.g., Information Technology"
                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                    />
                </div>
            </div>

            {/* Location */}
            <div className='flex flex-col gap-2'>
                <Label>Location</Label>
                <input
                    type="text"
                    value={educationData.location || ''}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    placeholder="e.g., Bhavnagar, Gujarat"
                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                />
            </div>

            {/* Dates */}

            <SelectDate
                educationData={educationData}
                handleFieldChange={handleFieldChange}
                handlePresentChange={handlePresentChange}
                title="I currently study here"
            />
        </div>
    );
};

export default UpdateEducation;
