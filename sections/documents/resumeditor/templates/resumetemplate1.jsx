"use client";
import React from "react";
import DOMPurify from "dompurify";

const ResumeSection = ({ title, children, className }) => (
    <section className="mb-6">
        <h2
            className={`uppercase tracking-wider mb-3 border-b border-black pb-1 ${className}`}
        >
            {title}
        </h2>
        {children}
    </section>
);


export const SafeHTML = ({ html }) => (
    <div
        className="safe-html-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
);

export const ResumeTemplate1 = ({ userResume }) => {

    const resume = {
        personalInfo: userResume?.parsedPersonalInfo,
        experience: userResume?.parsedExperience,
        education: userResume?.parsedEducation,
        projects: userResume?.parsedProjects,
        technicalSkills: userResume?.parsedSkills,
        achievementsAndCertifications:
            userResume?.parsedAchievementsAndCertifications,
        languages: userResume?.parsedLanguages,
        customSections: userResume?.parsedCustomSections,

    };

    return (
        <div className="pb-4 h-full">
            {resume?.personalInfo && (
                <div className="p-3  bg-white text-black">


                    <div className="w-full font-tinos leading-[1.3] resume-content mx-auto">
                        <header className="text-center mb-4"></header>
                        <header className="text-center  mb-4">
                            <h1 className="text-3xl font-bold mb-1">
                                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                            </h1>
                            <div className="text-sm flex justify-center items-center mb-2.5 flex-wrap gap-2">
                                {resume.personalInfo.phone && (
                                    <>
                                        <p>{resume.personalInfo.phone}</p>
                                        {(resume.personalInfo.email ||
                                            resume.personalInfo.linkedin ||
                                            resume.personalInfo.github ||
                                            resume.personalInfo.website) && <p>•</p>}
                                    </>
                                )}

                                {resume.personalInfo.email && (
                                    <>
                                        <p>{resume.personalInfo.email}</p>
                                        {(resume.personalInfo.linkedin ||
                                            resume.personalInfo.github ||
                                            resume.personalInfo.website) && <p>•</p>}
                                    </>
                                )}

                                {resume.personalInfo.linkedin && (
                                    <>
                                        <a
                                            href={
                                                resume.personalInfo.linkedin.startsWith("http")
                                                    ? resume.personalInfo.linkedin
                                                    : `https://${resume.personalInfo.linkedin}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                        {(resume.personalInfo.github ||
                                            resume.personalInfo.website) && <p>•</p>}
                                    </>
                                )}

                                {resume.personalInfo.github && (
                                    <>
                                        <a
                                            href={
                                                resume.personalInfo.github.startsWith("http")
                                                    ? resume.personalInfo.github
                                                    : `https://${resume.personalInfo.github}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                        {resume.personalInfo.website && <p>•</p>}
                                    </>
                                )}

                                {resume.personalInfo.website && (
                                    <a
                                        href={
                                            resume.personalInfo.website.startsWith("http")
                                                ? resume.personalInfo.website
                                                : `https://${resume.personalInfo.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {resume.personalInfo.website}
                                    </a>
                                )}
                            </div>

                            {resume?.personalInfo?.role || resume?.personalInfo?.summary && (
                                <div className="border-t pt-3 border-black">
                                    <h1 className="text-start mb-3 font-semibold">
                                        {resume?.personalInfo?.role}
                                    </h1>
                                    <div className="text-justify text-sm border-black">
                                        <SafeHTML html={resume?.personalInfo?.summary} />
                                    </div>
                                </div>
                            )}
                        </header>

                        {resume?.experience?.length > 0 ? (
                            <ResumeSection title="Work Experience">
                                {resume?.experience &&
                                    resume?.experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <h3 className="font-bold text-base">{exp?.title}</h3>
                                                </div>

                                                <p className="text-sm">
                                                    {exp?.startDate?.month && exp?.startDate?.year
                                                        ? `${exp.startDate.month} ${exp.startDate.year}`
                                                        : null}
                                                    {exp?.startDate?.month &&
                                                        exp?.startDate?.year &&
                                                        (exp?.endDate?.month ||
                                                            exp?.endDate?.year ||
                                                            exp?.present)
                                                        ? " - "
                                                        : null}
                                                    {exp?.endDate?.month && exp?.endDate?.year
                                                        ? `${exp.endDate.month} ${exp.endDate.year}`
                                                        : exp?.present
                                                            ? "Present"
                                                            : null}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold mb-1">
                                                {exp?.company} {exp?.location}
                                            </p>
                                            <SafeHTML html={exp?.description} />
                                        </div>
                                    ))}
                            </ResumeSection>
                        ) : null}

                        {resume?.education?.length > 0 ? (
                            <ResumeSection title="Education">
                                {resume.education.map((edu, index) => (
                                    <div key={index} className="mb-2">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold">{edu?.school}</h3>

                                            <p className="text-sm">
                                                {edu?.startDate?.month && edu?.startDate?.year
                                                    ? `${edu.startDate.month} ${edu.startDate.year}`
                                                    : null}
                                                {edu?.startDate?.month &&
                                                    edu?.startDate?.year &&
                                                    (edu?.endDate?.month ||
                                                        edu?.endDate?.year ||
                                                        edu?.present)
                                                    ? " - "
                                                    : null}
                                                {edu?.endDate?.month === "Present"
                                                    ? "Present"
                                                    : edu?.endDate?.month && edu?.endDate?.year
                                                        ? `${edu.endDate.month} ${edu.endDate.year}`
                                                        : edu?.present
                                                            ? "Present"
                                                            : null}
                                            </p>
                                        </div>
                                        <p>
                                            {edu?.degree} {edu?.fieldOfStudy}
                                        </p>
                                        <p className="text-sm">{edu?.location}</p>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}


                        {resume?.languages?.length > 0 ? (
                            <ResumeSection title="Languages">
                                {resume.languages.map((lang, index) => (
                                    <div key={index} className="text-sm flex flex-col mb-2 ">
                                        <span className="font-semibold">{lang?.language}</span>
                                        <div>
                                            {lang?.proficiency && `  ${lang.proficiency}`}
                                        </div>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}


                        {resume?.projects?.length > 0 ? (
                            <ResumeSection title="Projects">
                                {resume?.projects.map((proj, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="flex justify-between gap-4 items-baseline">
                                            <h3 className="font-bold">
                                                {proj?.name}

                                                <p className="text-sm">
                                                    {proj?.startDate?.month && proj?.startDate?.year
                                                        ? `${proj.startDate.month} ${proj.startDate.year}`
                                                        : null}
                                                    {proj?.startDate?.month &&
                                                        proj?.startDate?.year &&
                                                        (proj?.endDate?.month ||
                                                            proj?.endDate?.year ||
                                                            proj?.present)
                                                        ? " - "
                                                        : null}
                                                    {proj?.endDate?.month && proj?.endDate?.year
                                                        ? `${proj.endDate.month} ${proj.endDate.year}`
                                                        : proj?.present
                                                            ? "Present"
                                                            : null}
                                                </p>
                                            </h3>
                                            <p className="text-sm">


                                                {proj?.link && proj.link !== "" && (
                                                    <a
                                                        href={
                                                            proj?.link.startsWith("http")
                                                                ? proj.link
                                                                : `https://${proj.link}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View
                                                    </a>
                                                )}
                                            </p>
                                        </div>
                                        {proj?.technologies && (
                                            <p className="text-sm mb-1">
                                                <strong>Tech Stack:</strong>{" "}
                                                {Array.isArray(proj.technologies)
                                                    ? proj.technologies.join(", ")
                                                    : proj.technologies}
                                            </p>
                                        )}
                                        <div className="text-sm">
                                            <SafeHTML html={proj?.description} />
                                        </div>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}

                        {resume?.technicalSkills?.length > 0 ? (
                            <ResumeSection title="Skills">
                                {resume.technicalSkills.map((skill, index) => (
                                    <div key={index} className="mb-2">
                                        <h3 className="font-bold">{skill?.heading}</h3>
                                        <p className="text-sm">{skill?.skills?.join(", ")}</p>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}

                        {resume?.achievementsAndCertifications &&
                            resume?.achievementsAndCertifications?.length > 0 ? (
                            <ResumeSection title="Achievements and Certifications">
                                <ul className="list-disc pl-5 text-sm">
                                    {resume.achievementsAndCertifications.map((cert, index) =>
                                        cert && cert.title ? (
                                            <li key={cert._id || index} className="mb-1">
                                                {cert.title}
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            </ResumeSection>
                        ) : null}





                        {resume?.customSections?.length > 0 &&
                            resume.customSections.map((section, index) =>
                                section?.title ? (
                                    <ResumeSection key={index} title={section.title}>
                                        <SafeHTML html={section.content} />
                                    </ResumeSection>
                                ) : null
                            )}




                    </div>
                </div>
            )}
        </div>
    );
};