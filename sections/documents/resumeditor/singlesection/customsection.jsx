"use client"
import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { RiEditFill } from "react-icons/ri";
import toast from "react-hot-toast";
import TipTapEditor from "@/components/tiptapeditor";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { FcIdea } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";

const CustomSections = ({ setResume, resume }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [titleCopy, setTitleCopy] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleRemoveSection = () => {
        setResume((prev) => ({
            ...prev,
            parsedCustomSections: prev.parsedCustomSections.filter(
                (_, i) => i !== currentIndex
            ),
        }));
        toast.success(`Section ${currentIndex + 1} removed!`);
        setOpenDelete(false);
    };

    const handleSectionChange = (index, content) => {
        console.log("🚀 ~ handleSectionChange ~ content:", content)
        setResume((prev) => {
            const updated = [...(prev.parsedCustomSections || [])];
            updated[index] = { ...updated[index], content };
            return { ...prev, parsedCustomSections: updated };
        });
    };

    const handleTitleChange = (index, value) => {
        setResume((prev) => {
            const updated = [...(prev.parsedCustomSections || [])];
            updated[index] = { ...updated[index], title: value };
            return { ...prev, parsedCustomSections: updated };
        });
    };

    const handleOpenTitleDialog = (index) => {
        setCurrentIndex(index);
        setTitle(resume?.parsedCustomSections?.[index]?.title || "");
        setOpenDialog(true);
    };

    const handleUpdateFilename = () => {
        if (currentIndex !== null) {
            setUpdateLoading(true);
            handleTitleChange(currentIndex, title);
            setTimeout(() => {
                setUpdateLoading(false);
                setOpenDialog(false);
                toast.success("Section title updated!");
            }, 500);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Delete Section</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this section?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-start gap-2 py-4">
                        <div className="text-lg text-black/80 font-medium">
                            Delete Section
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                            Are you sure you want to delete this section? You won't be able to
                            undo this action.
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
                            onClick={handleRemoveSection}
                            className="bg-[#E11D48] hover:bg-[#e11d47c2] hover:text-white flex-1 min-w-0 font-medium text-white"
                        >
                            Yes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Title Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <span />
                <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                    <DialogHeader>
                        <DialogTitle className="font-circular font-semibold">
                            Edit Title
                        </DialogTitle>
                    </DialogHeader>



                    <div className="flex bg-gray-50 p-4 border rounded-md border-gray-100 items-center gap-2">
                        <FcIdea className="w-8 h-8" />
                        <div className="font-circular text-gray-500 text-sm">
                            Customize the title of this resume section, or reset it to the default title.
                        </div>
                    </div>


                    <div className="flex items-center gap-4 w-full">
                        <input
                            placeholder="Section Title"
                            type="text"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 font-circular h-10 w-full rounded-sm text-sm border border-gray-200 focus:border-primary-blue focus:outline-none"
                        />


                        <div>
                            <SlRefresh className="size-5" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenDialog(false)}
                            className="w-full border py-2 rounded-md px-4 font-circular"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdateFilename}
                            className="w-full flex items-center justify-center gap-2 bg-primary-blue text-white py-2 px-4 rounded-md font-circular"
                        >
                            {updateLoading && (
                                <AiOutlineLoading className="animate-spin w-4 h-4" />
                            )}
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Sections */}
            {resume?.parsedCustomSections?.map((section, index) => (
                <div
                    key={index}
                    className="bg-white flex flex-col gap-2 p-4 border rounded-md"
                >
                    <div className="flex justify-between items-center">
                        <div className="font-circular font-medium text-2xl text-gray-700">
                            {section?.title || "Untitled Section"}
                        </div>

                        <div className="flex items-center gap-4">
                            <BsTrashFill
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setOpenDelete(true);
                                }}
                                color="gray"
                                className="cursor-pointer hover:text-red-500"
                            />
                            <RiEditFill
                                onClick={() => handleOpenTitleDialog(index)}
                                className="cursor-pointer hover:text-primary-blue transition-colors"
                                color="gray"
                            />
                        </div>
                    </div>

                    <TipTapEditor
                        content={section?.content}
                        placeHolder="Start writing here..."
                        onChange={(content) => handleSectionChange(index, content)}
                    />
                </div>
            ))}
        </div>
    );
};

export default CustomSections;
