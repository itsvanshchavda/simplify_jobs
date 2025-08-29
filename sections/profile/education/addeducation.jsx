"use client"
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SelectDate from '../selectdate';
import clsx from 'clsx';
import UpdateUserApi from '@/apis/user/UpdateUser';
import toast from 'react-hot-toast';
import { useUser } from '@/context/userContext';

const AddEducation = ({ setOpen, education, setEducation, educationIndex, mode }) => {
    const [errors, setErrors] = useState({});
    const educationData = education?.[educationIndex] || {};
    const { dispatch } = useUser();
    const [loading, setLoading] = useState(false);

    const handleFieldChange = (field, value) => {
        setEducation((prev) => {
            const updated = [...prev];

            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                updated[educationIndex] = {
                    ...updated[educationIndex],
                    [parent]: {
                        ...updated[educationIndex]?.[parent],
                        [child]: value,
                    },
                };
            } else {
                updated[educationIndex] = {
                    ...updated[educationIndex],
                    [field]: value,
                };
            }

            return updated;
        });

        // clear error when typing
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

    useEffect(() => {
        if (!education || education.length === 0) {
            setEducation([
                {
                    degree: '',
                    fieldOfStudy: '',
                    school: '',
                    location: '',
                    startDate: { month: '', year: '' },
                    endDate: { month: '', year: '' },
                },
            ]);
        }
    }, [education, setEducation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === "new") {
            const { degree, fieldOfStudy, school, location } = educationData;
            const newErrors = {};

            if (!degree) newErrors.degree = "Required";
            if (!fieldOfStudy) newErrors.fieldOfStudy = "Required";
            if (!school) newErrors.school = "Required";
            if (!location) newErrors.location = "Required";

            if (!educationData?.startDate?.month) {
                newErrors.startMonth = "Required";
            }
            if (!educationData?.startDate?.year) {
                newErrors.startYear = "Required";
            }

            if (!educationData?.present) {
                if (!educationData?.endDate?.month) {
                    newErrors.endMonth = "Required";
                }
                if (!educationData?.endDate?.year) {
                    newErrors.endYear = "Required";
                }
            }


            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
        }

        setLoading(true);
        const res = await UpdateUserApi({ education });

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Education saved successfully!");
            dispatch({ type: "SET_USER", payload: res });
        }

        setLoading(false);
        setOpen(false)
    };

    const handlePresentChange = (checked) => {
        setEducation((prevWork) => {
            const updated = [...prevWork];
            updated[educationIndex] = {
                ...updated[educationIndex],
                present: checked,
                endDate: checked ? { month: 'Present', year: '' } : { month: '', year: '' },
            };
            return updated;
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full overflow-y-auto font-circular py-2 w-full"
        >
            <div className="flex px-[2rem] flex-col gap-6">
                {/* School */}
                <div className="flex flex-col gap-2">
                    <Label>School / University</Label>
                    <input
                        type="text"
                        value={educationData.school || ''}
                        onChange={(e) => handleFieldChange('school', e.target.value)}
                        placeholder="e.g., Dr. Babasaheb Ambedkar Open University"
                        className={clsx(
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm shadow placeholder:text-gray-400 focus:outline-none focus:ring-4",
                            {
                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.school,
                                "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.school,
                            }
                        )}
                    />
                    {errors.school && <p className="text-sm text-red-500">{errors.school}</p>}
                </div>

                {/* Degree + Field of Study */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Degree</Label>
                        <input
                            type="text"
                            value={educationData.degree || ''}
                            onChange={(e) => handleFieldChange('degree', e.target.value)}
                            placeholder="e.g., Bachelor of Science – BS"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm shadow placeholder:text-gray-400 focus:outline-none focus:ring-4",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.degree,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.degree,
                                }
                            )}
                        />
                        {errors.degree && <p className="text-sm text-red-500">{errors.degree}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Field of Study</Label>
                        <input
                            type="text"
                            value={educationData.fieldOfStudy || ''}
                            onChange={(e) => handleFieldChange('fieldOfStudy', e.target.value)}
                            placeholder="e.g., Information Technology"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm shadow placeholder:text-gray-400 focus:outline-none focus:ring-4",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.fieldOfStudy,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.fieldOfStudy,
                                }
                            )}
                        />
                        {errors.fieldOfStudy && <p className="text-sm text-red-500">{errors.fieldOfStudy}</p>}
                    </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                    <Label>Location</Label>
                    <input
                        type="text"
                        value={educationData.location || ''}
                        onChange={(e) => handleFieldChange('location', e.target.value)}
                        placeholder="e.g., Bhavnagar, Gujarat"
                        className={clsx(
                            "p-3 font-circular h-10 block w-full rounded-sm text-sm shadow placeholder:text-gray-400 focus:outline-none focus:ring-4",
                            {
                                "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.location,
                                "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.location,
                            }
                        )}
                    />
                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                </div>

                {/* Dates */}
                <SelectDate
                    error={errors}
                    sectionData={educationData}
                    handlePresentChange={handlePresentChange}
                    handleFieldChange={handleFieldChange}
                    title="Dates Attended"
                />
            </div>

            <div className="absolute bottom-0 w-full font-circular border-t py-3 shadow-md">
                <div className="flex w-full max-w-xl mx-auto justify-center items-center gap-6">
                    <button type="button" className="px-4 text-sm w-full py-1.5 border border-gray-200 rounded-md bg-white">
                        Cancel
                    </button>
                    <button disabled={loading} type="submit" className="px-4 py-1.5 w-full text-sm rounded-md bg-primary-blue text-white">
                        {loading ? 'Saving...' : 'Save Education'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddEducation;
