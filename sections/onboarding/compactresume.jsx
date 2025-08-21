"use client";
import React from "react";
import DOMPurify from "dompurify";

const ResumeSection = ({ title, children, className }) => (
    <section className="mb-4">
        <h2
            className={`uppercase tracking-wider text-sm font-bold mb-2 border-b border-black pb-1 ${className}`}
        >
            {title}
        </h2>
        {children}
    </section>
);

const ListItem = ({ children }) => <li className="mb-0.5">{children}</li>;

export const SafeHTML = ({ html }) => (
    <div
        className="safe-html-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
);

const CompactResume = ({ userResume }) => {
    console.log(userResume, "userResume");

    const resume = {
        personalInfo: userResume?.parsedPersonalInfo,
        experience: userResume?.parsedExperience,
        education: userResume?.parsedEducation,
        projects: userResume?.parsedProjects,
        technicalSkills: userResume?.parsedSkills,
        achievementsAndCertifications:
            userResume?.parsedAchievementsAndCertifications,
    };

    return (
        <div className="h-full font-">
            {resume?.personalInfo && (
                <div className="hide-scrollbar border rounded-xl px-4 max-h-[30rem] font-tinos bg-white text-black overflow-hidden">
                    <style jsx="true" global="true">
                        {`
              .safe-html-content ul {
                list-style-type: disc;
                padding-left: 1.2em;
                text-align: justify;
                margin: 0.25em 0;
              }
              .safe-html-content li {
                margin-bottom: 0.15em;
                text-align: justify;
                line-height: 1.3;
              }
              .safe-html-content ol {
                list-style-type: decimal;
                margin-left: 15px;
                padding-left: 0;
                text-align: justify;
                margin: 0.25em 0;
              }
              .safe-html-content p {
                margin: 0.25em 0;
                line-height: 1.3;
              }
            `}
                    </style>
                    <div className="w-full font-tinos leading-[1.25] resume-content mx-auto max-w-4xl">
                        {/* Header Section - More Compact */}
                        <header className="text-center mb-3">
                            <h1 className="text-2xl font-bold mb-1 tracking-wide">
                                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                            </h1>
                            <div className="text-xs flex justify-center items-center mb-2 flex-wrap gap-1.5">
                                {resume.personalInfo.phone && (
                                    <>
                                        <span>{resume.personalInfo.phone}</span>
                                        {(resume.personalInfo.email ||
                                            resume.personalInfo.linkedin ||
                                            resume.personalInfo.github ||
                                            resume.personalInfo.website) && <span>•</span>}
                                    </>
                                )}

                                {resume.personalInfo.email && (
                                    <>
                                        <span>{resume.personalInfo.email}</span>
                                        {(resume.personalInfo.linkedin ||
                                            resume.personalInfo.github ||
                                            resume.personalInfo.website) && <span>•</span>}
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
                                            className="hover:underline"
                                        >
                                            LinkedIn
                                        </a>
                                        {(resume.personalInfo.github ||
                                            resume.personalInfo.website) && <span>•</span>}
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
                                            className="hover:underline"
                                        >
                                            GitHub
                                        </a>
                                        {resume.personalInfo.website && <span>•</span>}
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
                                        className="hover:underline"
                                    >
                                        {resume.personalInfo.website}
                                    </a>
                                )}
                            </div>

                            {resume?.personalInfo?.role || resume?.personalInfo?.summary ? (
                                <div className="border-t pt-2 border-black mt-2">
                                    {resume?.personalInfo?.role && (
                                        <h2 className="text-start mb-2 font-semibold text-sm">
                                            {resume?.personalInfo?.role}
                                        </h2>
                                    )}
                                    {resume?.personalInfo?.summary && (
                                        <div className="text-justify text-xs leading-tight">
                                            <SafeHTML html={resume?.personalInfo?.summary} />
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </header>

                        {/* Experience Section - More Compact */}
                        {resume?.experience?.length > 0 ? (
                            <ResumeSection title="Work Experience">
                                {resume?.experience &&
                                    resume?.experience.map((exp, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="flex items-baseline justify-between mb-0.5">
                                                <h3 className="font-bold text-sm">{exp?.title}</h3>
                                                <span className="text-xs whitespace-nowrap ml-2">
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
                                                </span>
                                            </div>
                                            <div className="text-xs font-medium mb-1">
                                                {exp?.company}{exp?.location ? `, ${exp.location}` : null}
                                            </div>
                                            <div className="text-xs">
                                                <SafeHTML html={exp?.description} />
                                            </div>
                                        </div>
                                    ))}
                            </ResumeSection>
                        ) : null}

                        {/* Education Section - More Compact */}
                        {resume?.education?.length > 0 ? (
                            <ResumeSection title="Education">
                                {resume.education.map((edu, index) => (
                                    <div key={index} className="mb-2">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-sm">{edu?.school}</h3>
                                            <span className="text-xs whitespace-nowrap ml-2">
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
                                            </span>
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-medium">
                                                {edu?.degree} {edu?.fieldOfStudy}
                                            </div>
                                            {edu?.location && <div>{edu?.location}</div>}
                                        </div>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}

                        {/* Projects Section - More Compact */}
                        {resume?.projects?.length > 0 ? (
                            <ResumeSection title="Projects">
                                {resume?.projects.map((proj, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-sm">{proj?.name}</h3>
                                                <span className="text-xs">
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
                                                </span>
                                            </div>
                                            {proj?.link && (
                                                <a
                                                    href={
                                                        proj?.link.startsWith("http")
                                                            ? proj.link
                                                            : `https://${proj.link}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs hover:underline ml-2"
                                                >
                                                    View
                                                </a>
                                            )}
                                        </div>
                                        {proj?.technologies && (
                                            <div className="text-xs mb-1">
                                                <strong>Tech:</strong>{" "}
                                                {Array.isArray(proj.technologies)
                                                    ? proj.technologies.join(", ")
                                                    : proj.technologies}
                                            </div>
                                        )}
                                        <div className="text-xs">
                                            <SafeHTML html={proj?.description} />
                                        </div>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}

                        {/* Skills Section - More Compact */}
                        {resume?.technicalSkills?.length > 0 ? (
                            <ResumeSection title="Skills">
                                {resume.technicalSkills.map((skill, index) => (
                                    <div key={index} className="mb-1.5">
                                        <span className="font-bold text-xs">{skill?.heading}:</span>{" "}
                                        <span className="text-xs">{skill?.skills?.join(", ")}</span>
                                    </div>
                                ))}
                            </ResumeSection>
                        ) : null}

                        {/* Achievements Section - More Compact */}
                        {resume?.achievementsAndCertifications &&
                            resume?.achievementsAndCertifications?.length > 0 ? (
                            <ResumeSection title="Achievements and Certifications">
                                <ul className="list-disc pl-4 text-xs space-y-0.5">
                                    {resume.achievementsAndCertifications.map((cert, index) =>
                                        cert && cert["certification/acchivement"] ? (
                                            <li key={cert._id || index} className="leading-tight">
                                                {cert["certification/acchivement"]}
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            </ResumeSection>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};


export default CompactResume;