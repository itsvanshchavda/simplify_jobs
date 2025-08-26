import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';
import SelectDate from './selectdate';
import TipTapEditor from '@/components/tiptapeditor';
import { Button } from '@/components/ui/button';

const UpdateProject = ({ setResume, resume, projectIndex }) => {
    const projectData = resume?.parsedProjects?.[projectIndex] || [];
    console.log("🚀 ~ UpdateProject ~ projectData:", projectData);

    const handleFieldChange = (field, value) => {
        setResume((prevResume) => {
            const updatedProjects = [...(prevResume.parsedProjects || [])];

            if (field.includes('.')) {
                // Handle nested fields like startDate.month
                const [parent, child] = field.split('.');
                updatedProjects[projectIndex] = {
                    ...updatedProjects[projectIndex],
                    [parent]: {
                        ...updatedProjects[projectIndex][parent],
                        [child]: value,
                    },
                };
            } else {
                // Handle direct fields
                updatedProjects[projectIndex] = {
                    ...updatedProjects[projectIndex],
                    [field]: value,
                };
            }

            return {
                ...prevResume,
                parsedProjects: updatedProjects,
            };
        });
    };

    useEffect(() => {
        if (!resume?.parsedProjects || resume.parsedProjects.length === 0) {
            setResume((prevResume) => ({
                ...prevResume,
                parsedProjects: [
                    {
                        startDate: { month: "", year: "" },
                        endDate: { month: "", year: "" },
                        name: "",
                        description: "",
                        technologies: [],
                        link: "",
                    },
                ],
            }));
        }
    }, []);

    const handlePresentChange = (checked) => {
        setResume((prevResume) => {
            const updatedProjects = [...(prevResume.parsedProjects || [])];
            updatedProjects[projectIndex] = {
                ...updatedProjects[projectIndex],
                present: checked,
                endDate: checked
                    ? { month: "Present", year: "" }
                    : { month: "", year: "" },
            };

            return {
                ...prevResume,
                parsedProjects: updatedProjects,
            };
        });
    };

    // Handle description change
    const handleDescriptionChange = (index, content) => {
        handleFieldChange('description', content);
    };

    // Add description
    const handleAddDescription = (index) => {
        handleFieldChange('description', '<p>Start typing your project description here...</p>');
    };

    // Clear description
    const handleClearDescription = (index) => {
        handleFieldChange('description', '');
    };

    return (
        <div className='px-[2rem] font-circular flex flex-col gap-6 py-2 w-full'>
            {/* Project Title */}
            <div className='flex flex-col gap-2'>
                <Label>Project Title</Label>
                <input
                    type="text"
                    value={projectData.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g., Portfolio Website"
                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                />
            </div>

            {/* Project Description */}
            <div>
                <Label className="text-sm font-medium">Project Description</Label>

                {!projectData.description || projectData.description === "" ? (
                    <div className="mt-3">
                        <Button
                            onClick={() => handleAddDescription(projectIndex)}
                            variant="outline"
                            className="w-full rounded-lg border-dashed border-2 hover:border-primary-green transition-colors"
                        >
                            + Add Description
                        </Button>
                    </div>
                ) : (
                    <div className="pt-1 space-y-2">
                        <TipTapEditor
                            className="bg-white focus-within:border-primary-green"
                            content={
                                Array.isArray(projectData.description)
                                    ? projectData.description.join(" ")
                                    : projectData.description
                            }
                            onChange={(content) => handleDescriptionChange(projectIndex, content)}
                            placeholder="Describe your project, technologies, and results..."
                            autoFocus={true}
                        />

                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                                Tip: Use bullet points to highlight key features
                            </p>
                            <Button
                                onClick={() => handleClearDescription(projectIndex)}
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
                sectionData={projectData}
                handleFieldChange={handleFieldChange}
                handlePresentChange={handlePresentChange}
                title="This project is ongoing"
            />
        </div>
    );
};

export default UpdateProject;
