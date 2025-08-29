"use client"
import { Label } from '@/components/ui/label';
import React, { useState, useEffect, forwardRef } from 'react';
import TipTapEditor from '@/components/tiptapeditor';
import { Button } from '@/components/ui/button';
import SelectDate from '../selectdate';
import clsx from 'clsx';
import UpdateUserApi from '@/apis/user/UpdateUser';
import toast from 'react-hot-toast';
import { useUser } from '@/context/userContext';

const AddExperience = ({ setOpen, work, setWork, experienceIndex }) => {
    const [errors, setErrors] = useState({});
    const experienceData = work?.[experienceIndex] || {};
    const { dispatch } = useUser();
    const [loading, setLoading] = useState(false);


    const handleFieldChange = (field, value) => {
        setWork((prevWork) => {
            const updated = [...prevWork];

            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                updated[experienceIndex] = {
                    ...updated[experienceIndex],
                    [parent]: {
                        ...updated[experienceIndex]?.[parent],
                        [child]: value,
                    },
                };
            } else {
                updated[experienceIndex] = {
                    ...updated[experienceIndex],
                    [field]: value,
                };
            }

            return updated;
        });

        // ✅ remove error for this field when user types
        setErrors((prev) => {
            const updatedErrors = { ...prev };

            if (field.startsWith("startDate.")) {
                if (field.endsWith("month")) delete updatedErrors["startMonth"];
                if (field.endsWith("year")) delete updatedErrors["startYear"];
            }

            if (field.startsWith("endDate.")) {
                if (field.endsWith("month")) delete updatedErrors["endMonth"];
                if (field.endsWith("year")) delete updatedErrors["endYear"];
            }



            delete updatedErrors[field];
            return updatedErrors;
        });
    };


    // Initialize empty experience if none
    useEffect(() => {
        if (!work || work.length === 0) {
            setWork([
                {
                    title: '',
                    company: '',
                    location: '',
                    startDate: { month: '', year: '' },
                    endDate: { month: '', year: '' },
                    present: false,
                    description: '',
                },
            ]);
        }
    }, [work, setWork]);

    // Present checkbox
    const handlePresentChange = (checked) => {
        setWork((prevWork) => {
            const updated = [...prevWork];
            updated[experienceIndex] = {
                ...updated[experienceIndex],
                present: checked,
                endDate: checked ? { month: 'Present', year: '' } : { month: '', year: '' },
            };
            return updated;
        });
    };
    // Handle description change
    const handleDescriptionChange = (content) => {
        handleFieldChange('description', content);
    };

    const handleAddDescription = () => {
        // Use a more stable default content and avoid re-mounting the editor
        const defaultDescription = '<p>Start typing your job description here...</p>';
        handleFieldChange('description', defaultDescription);
    };

    // Clear description
    const handleClearDescription = () => {
        handleFieldChange('description', '');
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, company, location } = experienceData;
        const newErrors = {};

        if (!title) newErrors.title = "Required";
        if (!company) newErrors.company = "Required";
        if (!location) newErrors.location = "Required";


        if (!experienceData?.startDate?.month) {
            newErrors.startMonth = "Required";
        }
        if (!experienceData?.startDate?.year) {
            newErrors.startYear = "Required";
        }

        if (!experienceData?.present) {
            if (!experienceData?.endDate?.month) {
                newErrors.endMonth = "Required";
            }
            if (!experienceData?.endDate?.year) {
                newErrors.endYear = "Required";
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // stop if errors


        setLoading(true);
        const res = await UpdateUserApi({ work });

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Experience saved successfully!");
            dispatch({ type: "SET_USER", payload: res });
        }

        setLoading(false);
        setOpen(false);
    };






    return (
        <form
            onSubmit={handleSubmit}
            className="h-full overflow-y-auto font-circular py-2 w-full"
        >
            <div className=' flex  px-[2rem]  flex-col gap-6'>
                {/* Title */}
                <div className="flex flex-col gap-2">
                    <Label>Title</Label>
                    <input
                        type="text"
                        value={experienceData.title || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        placeholder="e.g., Software Engineer"
                        className={clsx(
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                            {
                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.title,
                                "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.title,
                            }
                        )}
                    />

                    {errors.title && <p className="text-sm text-red-500 ">{errors.title}</p>}
                </div>

                {/* Job Description */}
                <div>
                    <Label className="text-sm font-medium">Job Description</Label>

                    {!experienceData.description || experienceData.description === "" ? (
                        <div className="mt-3">
                            <Button
                                type="button"
                                onClick={() => handleAddDescription()}
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
                                onChange={(content) => handleDescriptionChange(content)}
                                placeholder="Describe your role, responsibilities, and achievements..."
                            />

                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">
                                    Tip: Use bullet points to highlight key achievements
                                </p>
                                <Button
                                    type="button"
                                    onClick={() => handleClearDescription()}
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



                {/* Company + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Company Name</Label>
                        <input
                            type="text"
                            name='company'
                            value={experienceData.company || ''}
                            onChange={(e) => handleFieldChange('company', e.target.value)}
                            placeholder="e.g., Google"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.company,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.company,
                                }
                            )}
                        />

                        {errors.company && <p className="text-sm text-red-500 ">{errors.company}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Location</Label>
                        <input
                            type="text"
                            name='location'
                            value={experienceData.location || ''}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                            placeholder="e.g., Bhavnagar, Gujarat"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.location,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.location,
                                }
                            )}
                        />

                        {errors.location && <p className="text-sm text-red-500 ">{errors.location}</p>}
                    </div>
                </div>

                {/* Dates */}
                <SelectDate
                    error={errors}
                    sectionData={experienceData}
                    handleFieldChange={handleFieldChange}
                    handlePresentChange={handlePresentChange}
                    title="I am currently working here"
                />
            </div>

            <div className="absolute bottom-0 w-full font-circular border-t  py-3 shadow-md">
                <div className="flex w-full max-w-xl mx-auto justify-center items-center gap-6 ">
                    <button disabled={loading} onClick={() => setOpen(false)} type='button' className="px-4 text-sm w-full py-1.5 border border-gray-200 rounded-md bg-white">
                        Cancel
                    </button>

                    <button disabled={loading} type='submit' className="px-4 py-1.5 w-full text-sm rounded-md bg-primary-blue text-white">
                        {loading ? 'Saving...' : 'Save Experience'}
                    </button>
                </div>
            </div>



        </form>






    );
};

export default AddExperience;
