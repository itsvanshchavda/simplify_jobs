import FAQ from "@/components/common/FAQ";
import JobList from "@/components/common/joblist";
import ResumeFeatures from "@/sections/resume-builder/resumefeatures";
import ResumeHero from "@/sections/resume-builder/resumehero";
import React from "react";

const page = () => {
  const data = [
    {
      question:
        "What exactly is a professional resume and what is its purpose?",
      answer:
        "A professional resume is a summary of your work history, skills, and career achievements that showcases why your background makes you a good fit for the job you're applying for. This means that your resume should be changing depending on the specific job requirements and responsibilities. It's crucial that the professional resume you create is tailored to the job requirements and integrates well with the company's ATS or hiring software – your goal is to catch the attention of hiring managers and stand out from other candidates!",
    },
    {
      question: "What is an AI resume builder?",
      answer:
        "An AI resume builder is simply a tool to help you quickly create a professional resume that leverages AI to help reword and reorganize various aspects of your career history. Most resume builders (including Simplify's!) come with pre-designed templates that are compatible with the hiring softwares and ATS's used by employers to review resumes, and allow you to easily edit the sections of your resume in a few clicks. You'll be able to use AI to quickly generate professional summaries, reword bullet points, and more!",
    },
    {
      question:
        "How does Simplify's AI generate my resume bullets, professional summary, and cover letter?",
      answer:
        "When you sign up on Simplify, you'll be asked to upload an existing resume or share some short details about your career history and skills. Our AI will analyze this data and compare it with the job description you're applying for to output information that highlights your strengths and why you would be a good fit for that specific opportunity. We trained our AI (which is powered by OpenAI's GPT) on recruiter-approved resumes and cover letters to ensure that the information we generate fit what hiring managers are looking for and help you put your best foot forward.",
    },
    {
      question:
        "Can you use ChatGPT to create a resume? What are the advantages to using Simplify?",
      answer:
        "More than 50% of job seekers are using AI in their job search – however, using ChatGPT to create your resume is NOT recommended. ChatGPT is a general-purpose LLM that is not designed to help you craft detailed resumes that are tailored to the job you are applying for. Simplify's AI resume builder and cover letter generator is powered by the same foundational AI-model used by ChatGPT but has been trained on specific recruiter-vetted resumes and cover letters. Our AI was designed specifically to help you tailor professional documents and ensures that everything you create follows best practices – a huge step up from using ChatGPT or Claude.",
    },
  ];
  return (
    <div>
      <ResumeHero />
      <ResumeFeatures />
      <JobList />
      <FAQ data={data} />
    </div>
  );
};

export default page;
