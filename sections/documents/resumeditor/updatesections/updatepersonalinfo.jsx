"use client"
import RewriteSummaryApi from '@/apis/resume/RewriteSummaryApi';
import TipTapEditor from '@/components/tiptapeditor';
import { Label } from '@/components/ui/label';
import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsStars } from 'react-icons/bs';
import { FaRegEyeSlash } from 'react-icons/fa';
import { GoEye } from "react-icons/go";


const UpdatePersonalInfo = ({ setResume, resum }) => {
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState({
        personalInfo: true,
        professionalSummary: true,
    });

    const [hideSummary, setHideSummary] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim(); // trim spaces

        console.log(name, trimmedValue);
        setResume((prev) => ({
            ...prev,
            parsedPersonalInfo: {
                ...prev.parsedPersonalInfo,
                [name]: trimmedValue,
            },
        }));
    };

    const validatePersonalInfo = (personalInfo) => {
        const errors = {};

        const website = personalInfo.website?.trim();
        if (website) {
            const websitePattern = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

            if (!websitePattern.test(website)) {
                errors.website = "Please enter a valid website URL.";
            }
        }

        // LinkedIn
        const linkedin = personalInfo.linkedin?.trim();
        if (linkedin && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/i.test(linkedin)) {
            errors.linkedin = "Please enter a valid LinkedIn URL.";
        }

        // GitHub
        const github = personalInfo.github?.trim();
        if (github && !/^(https?:\/\/)?(www\.)?github\.com\/[A-z0-9_-]+\/?$/i.test(github)) {
            errors.github = "Please enter a valid GitHub URL.";
        }

        return errors;
    };
    useEffect(() => {
        const validationErrors = validatePersonalInfo(resum?.parsedPersonalInfo || {});
        setErrors(validationErrors);
    }, [resum?.parsedPersonalInfo]);

    const toggleCollapse = (title) => {
        setIsOpen((prev) => ({
            personalInfo: title === "personalInfo" ? !prev.personalInfo : prev.personalInfo,
            professionalSummary: title === "professionalSummary" ? !prev.professionalSummary : prev.professionalSummary,
        }));
    };


    const toggleSummary = () => {
        setResume((prev) => {
            const isHidden = !prev.parsedPersonalInfo?.professionalSummary;

            return {
                ...prev,
                parsedPersonalInfo: {
                    ...prev.parsedPersonalInfo,
                    professionalSummary: isHidden
                        ? resum?.parsedPersonalInfo?.professionalSummary || "" // show again
                        : "", // hide → empty
                },
            };
        });

        setHideSummary((prev) => !prev);
    };



    const handleRewrite = async () => {

        setSummaryLoading(true);

        const summary = resum?.parsedPersonalInfo?.summary || ""
        if (!summary) return;

        const res = await RewriteSummaryApi({ userSummary: summary });
        if (res?.error) {
            setSummaryLoading(false);
            toast.error(res.error);
            return;
        }

        if (res?.summary) {
            setResume((prev) => ({
                ...prev,
                parsedPersonalInfo: {
                    ...prev.parsedPersonalInfo,
                    summary: res.summary,
                },
            }));
        }

        setSummaryLoading(false);
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className={`p-6  bg-white border rounded-md`}>
                <div className={`flex ${isOpen.personalInfo ? "pb-4" : ""} items-center justify-between cursor-pointer`} onClick={() => toggleCollapse("personalInfo")}>
                    <div className='font-circular font-medium text-2xl text-gray-700'>Resume Header</div>
                    <div className={`p-1 border border-gray-100 rounded-md bg-gray-50 transition-transform ${isOpen.personalInfo ? "rotate-0" : "-rotate-180"}`}>
                        <ChevronUp className='text-gray-500' strokeWidth={1} />
                    </div>
                </div>

                <div className={`flex flex-col gap-4  overflow-hidden ${isOpen.personalInfo ? "max-h-[2000px]" : "max-h-0"}`}>
                    {/* First & Last Name */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {["firstName", "lastName"].map((field) => (
                            <div key={field} className='font-circular flex flex-col gap-2.5'>
                                <Label>{field === "firstName" ? "First Name" : "Last Name"}</Label>
                                <input
                                    name={field}
                                    value={resum?.parsedPersonalInfo?.[field] || ""}
                                    onChange={handleInputChange}
                                    placeholder={`Edit ${field === "firstName" ? "First" : "Last"} Name`}
                                    type="text"
                                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                                />
                            </div>
                        ))}
                    </div>

                    {/* GitHub & LinkedIn */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {["linkedin", "github"].map((field) => (
                            <div key={field} className='font-circular flex flex-col gap-2.5'>
                                <Label>{field === "github" ? "Github Profile" : "Linkedin Profile"}</Label>
                                <input
                                    name={field}
                                    value={resum?.parsedPersonalInfo?.[field] || ""}
                                    onChange={handleInputChange}
                                    placeholder={`${field === "github" ? "Github" : "Linkedin"} URL`}
                                    type="url"
                                    className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                                />
                                {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Website & Phone */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='font-circular flex flex-col gap-2.5'>
                            <Label>Personal Website</Label>
                            <input
                                name="website"
                                value={resum?.parsedPersonalInfo?.website || ""}
                                onChange={handleInputChange}
                                placeholder="Personal Website URL"
                                type="url"
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                            />

                            {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website}</p>}
                        </div>


                        <div className='font-circular flex flex-col gap-2.5'>
                            <Label>Phone number</Label>
                            <input
                                name="phone"
                                value={resum?.parsedPersonalInfo?.phone || ""}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                type="tel"
                                className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90 border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10"
                            />
                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                    </div>
                </div>
            </div>


            <div className="p-6  bg-white border rounded-md">
                <div className={`flex ${isOpen.professionalSummary ? "pb-4" : ""} items-center justify-between cursor-pointer`} onClick={() => toggleCollapse("professionalSummary")}>
                    <div className='font-circular font-medium text-2xl text-gray-700'>

                        Professional Summary
                    </div>
                    <div className='flex items-center gap-4'>

                        {isOpen.professionalSummary && (
                            <div onClick={toggleSummary} className='flex items-center gap-2 font-circular text-sm'>
                                {hideSummary ? <FaRegEyeSlash /> : <GoEye />}

                                <div className='sm:block hidden'>
                                    {hideSummary ? "Show Summary" : "Hide Summary"}
                                </div>


                                <div className='sm:hidden block'>
                                    {hideSummary ? "Show" : "Hide"}
                                </div>
                            </div>
                        )}
                        <div className={`p-1 border  border-gray-100 rounded-md bg-gray-50 transition-transform ${isOpen.professionalSummary ? "rotate-0" : "-rotate-180"}`}>
                            <ChevronUp className='text-gray-500' strokeWidth={1} />
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col gap-4  overflow-hidden ${isOpen.professionalSummary ? "max-h-[2000px]" : "max-h-0"}`}>
                    <div className='flex flex-col gap-4'>
                        <TipTapEditor

                            content={resum?.parsedPersonalInfo?.summary || ""}
                            onContentChange={(content) => setResume((prev) => ({
                                ...prev,
                                parsedPersonalInfo: {
                                    ...prev.parsedPersonalInfo,
                                    summary: content,
                                },
                            }))}
                        />

                        {resum?.parsedPersonalInfo?.summary && (
                            <div onClick={handleRewrite} className='flex cursor-pointer justify-end items-center gap-2'>
                                <div className='px-4 py-1.5 text-primary-blue text-sm rounded-md border border-primary-blue flex items-center gap-1'>
                                    <BsStars />

                                    <div className='font-circular'>
                                        Rewrite with AI
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePersonalInfo;
