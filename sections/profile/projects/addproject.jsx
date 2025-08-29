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

const AddProject = ({ setOpen, projects, setProjects, projectIndex }) => {
    const [errors, setErrors] = useState({});
    const projectData = projects?.[projectIndex] || {};
    const { dispatch } = useUser();
    const [loading, setLoading] = useState(false);


    const handleFieldChange = (field, value) => {
        setProjects((prevProject) => {
            const updated = [...prevProject];

            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                updated[projectIndex] = {
                    ...updated[projectIndex],
                    [parent]: {
                        ...updated[projectIndex]?.[parent],
                        [child]: value,
                    },
                };
            } else {
                updated[projectIndex] = {
                    ...updated[projectIndex],
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


    useEffect(() => {
        if (!projects || projects.length === 0) {
            setProjects([
                {
                    name: '',
                    startDate: { month: '', year: '' },
                    endDate: { month: '', year: '' },
                    present: false,
                    link: '',
                },
            ]);
        }
    }, [projects, setProjects]);

    // Present checkbox
    const handlePresentChange = (checked) => {
        setProjects((prevProject) => {
            const updated = [...prevProject];
            updated[projectIndex] = {
                ...updated[projectIndex],
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

        const newErrors = {};

        if (!projectData?.name) newErrors.name = "Required";


        if (!projectData?.startDate?.month) {
            newErrors.startMonth = "Required";
        }
        if (!projectData?.startDate?.year) {
            newErrors.startYear = "Required";
        }

        if (!projectData?.present) {
            if (!projectData?.endDate?.month) {
                newErrors.endMonth = "Required";
            }
            if (!projectData?.endDate?.year) {
                newErrors.endYear = "Required";
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // stop if errors


        setLoading(true);
        const res = await UpdateUserApi({ projects });

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Project saved successfully!");
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

                <div className='grid grid-cols-2 gap-4'>
                    <div className="flex flex-col gap-2">
                        <Label>
                            Project Name
                        </Label>
                        <input
                            type="text"
                            value={projectData.name || ''}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            placeholder="e.g., Software Engineer"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.name,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.name,
                                }
                            )}
                        />

                        {errors.title && <p className="text-sm text-red-500 ">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Project Link
                        </Label>
                        <input
                            type="text"
                            value={projectData.link || ''}
                            onChange={(e) => handleFieldChange('link', e.target.value)}
                            placeholder="e.g., Project Link"
                            className={clsx(
                                "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                                {
                                    "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !errors.link,
                                    "border border-red-500 focus:border-red-500 focus:ring-red-200": errors.link,
                                }
                            )}
                        />

                        {errors.title && <p className="text-sm text-red-500 ">{errors.name}</p>}
                    </div>
                </div>

                {/* Job Description */}
                <div>
                    <Label className="text-sm font-medium">Job Description</Label>

                    {!projectData.description || projectData.description === "" ? (
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
                                    Array.isArray(projectData.description)
                                        ? projectData.description.join(" ")
                                        : projectData.description
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






                {/* Dates */}
                <SelectDate
                    error={errors}
                    sectionData={projectData}
                    handleFieldChange={handleFieldChange}
                    handlePresentChange={handlePresentChange}
                    title="I am currently working on this project"
                />
            </div>

            <div className="absolute bottom-0 w-full font-circular border-t  py-3 shadow-md">
                <div className="flex w-full max-w-xl mx-auto justify-center items-center gap-6 ">
                    <button disabled={loading} onClick={() => setOpen(false)} type='button' className="px-4 text-sm w-full py-1.5 border border-gray-200 rounded-md bg-white">
                        Cancel
                    </button>

                    <button disabled={loading} type='submit' className="px-4 py-1.5 w-full text-sm rounded-md bg-primary-blue text-white">
                        {loading ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>



        </form>






    );
};

export default AddProject;
