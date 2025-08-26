"use client"
import React, { useState } from 'react';
import { ChevronUp, Plus } from 'lucide-react';
import { BsTrashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RiEditFill } from 'react-icons/ri';

const Achievements = ({ setResume, resume }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [hideAchievements, setHideAchievements] = useState(false);

    const handleAddNewAchievement = () => {
        const newAchievement = { title: "" };

        setResume((prevResume) => ({
            ...prevResume,
            parsedAchievementsAndCertifications: [
                ...(prevResume.parsedAchievementsAndCertifications || []),
                newAchievement,
            ],
        }));

        toast.success("New achievement added successfully!");
    };

    const handleRemoveAchievement = () => {
        setResume((prevResume) => ({
            ...prevResume,
            parsedAchievementsAndCertifications:
                prevResume.parsedAchievementsAndCertifications.filter((_, i) => i !== currentIndex),
        }));

        toast.success(`Achievement ${currentIndex + 1} removed successfully!`);
        setOpenDelete(false);
    };


    const handleAchievementChange = (index, value) => {
        const updatedAchievements = [...(resume.parsedAchievementsAndCertifications || [])];
        updatedAchievements[index].title = value;

        setResume((prevResume) => ({
            ...prevResume,
            parsedAchievementsAndCertifications: updatedAchievements,
        }));
    };


    return (
        <div className="flex flex-col gap-4">

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle className="text-base text-black/80 font-medium">
                            Delete Achievement
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Are you sure you want to delete this achievement?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-start gap-2 py-4">
                        <div className="text-lg text-black/80 font-medium">
                            Delete Achievement
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                            Are you sure you want to delete this achievement? You won't be able to undo this action.
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            className="flex-1 min-w-0"
                            variant="outline"
                            onClick={() => setOpenDelete(false)}
                        >
                            No
                        </Button>

                        <Button
                            style={{ outline: "none" }}
                            onClick={handleRemoveAchievement}
                            className="bg-[#E11D48] hover:bg-[#e11d47c2] hover:text-white flex-1 min-w-0 font-medium text-white"
                        >
                            Yes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Section */}
            <div className="p-6 bg-white border rounded-md">
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="font-circular font-medium text-2xl text-gray-700">Achievements & Certifications</div>

                    <div className="flex items-center gap-4">
                        {!hideAchievements && (
                            <div
                                onClick={handleAddNewAchievement}
                                className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors sm:px-3 px-2 py-1.5 border border-gray-200 rounded-md"
                            >
                                <div className="font-circular sm:block hidden font-medium text-sm text-gray-700">Add New Achievements</div>

                                <Plus className=" text-gray-500" size={20} strokeWidth={1} />
                            </div>

                        )}

                        <div onClick={() => setHideAchievements(!hideAchievements)} className={`p-1 border border-gray-100 rounded-md bg-gray-50 transition-transform ${hideAchievements ? "rotate-0" : "-rotate-180"}`}>
                            <ChevronUp className='text-gray-500' strokeWidth={1} />
                        </div>
                    </div>
                </div>

                {!hideAchievements && (
                    <div className="flex flex-col gap-4 mt-4">
                        {resume?.parsedAchievementsAndCertifications?.map((achievement, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 px-[1rem] flex justify-between items-center flex-1 p-2.5 border border-gray-50 rounded-md min-h-[50px]"
                            >
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={achievement.title}
                                        onChange={(e) => handleAchievementChange(index, e.target.value)}
                                        onBlur={() => setEditingIndex(null)}
                                        className="w-full bg-transparent outline-none font-circular font-medium text-base"
                                        autoFocus
                                    />
                                ) : (
                                    <div
                                        onClick={() => setEditingIndex(index)}
                                        className="font-circular line-clamp-1 font-medium text-base cursor-pointer"
                                    >
                                        {index + 1}. {achievement.title || "Achievement title not specified"}
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <BsTrashFill
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setOpenDelete(true);
                                        }}
                                        color="gray"
                                        className="cursor-pointer hover:text-primary-blue transition-colors"
                                    />
                                    <RiEditFill
                                        onClick={() => setEditingIndex(index)}
                                        className="cursor-pointer hover:text-primary-blue transition-colors"
                                        color="gray"
                                    />
                                </div>
                            </div>
                        ))}


                        {(!resume?.parsedAchievementsAndCertifications ||
                            resume.parsedAchievementsAndCertifications.length === 0) && (
                                <div className="bg-gray-50 px-[1rem] flex justify-center items-center p-4 border border-gray-200 rounded-md">
                                    <div className="text-gray-500 font-circular font-medium text-sm">
                                        No achievements found. Click to add your achievements.
                                    </div>
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
