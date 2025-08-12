import FAQ from "@/components/common/FAQ";
import JobList from "@/components/common/joblist";
import ResumeFeatures from "@/sections/resume-builder/resumefeatures";
import ResumeHero from "@/sections/resume-builder/resumehero";
import React from "react";

const page = () => {
  const data = [
    {
      question: "Is Simplify free? How do you make money?",
      answer:
        "We dropped out of college and started Simplify to equip job seekers with the tools they need to put their best foot forward in the job search. The base version of Simplify and Simplify Copilot – including unlimited job tracking and autofill – is and will be free forever. We make money by charging companies to post jobs and promote their openings – we don't sell your data. We also have a premium subscription called Simplify+ that offers an additional suite of AI features to help you supercharge your job search.",
    },
    {
      question: "How does Simplify work?",
      answer:
        "Think of Simplify like a personal Hollywood-agent for your career. When you create a profile, you'll tell us the skills you have, the types jobs you're looking for, and any dealbreakers (minimum salary, location, etc.). Our AI will match you with specific opportunities that fit you from the millions of opportunities in our database. When you apply, we'll help you autofill your application and show you the most important keywords that are missing from your resume. We have an AI resume builder that lets you tailor your resume in seconds. Finally, our tracker helps you stay organized across all the jobs you've applied to. Ready to see Simplify in action? Click the teal “Sign-Up” button to get started!",
    },
    {
      question: "How does Simplify handle my data?",
      answer:
        "We're internet users too and place a heavy emphasis and commitment to your privacy. First and foremost, we do not sell your data. The data you share with us is used to help match you with relevant jobs and autofill your applications. Simplify also operates as a hiring marketplace, meaning recruiters often use Simplify to post exclusive opportunities and find perfect-fit candidates (like you!). None of your data is shared with anyone off-platform without your consent – that's a promise!",
    },
    {
      question: "How does Simplify get the job posting it recommends me?",
      answer:
        "We're internet users too and place a heavy emphasis and commitment to your privacy. First and foremost, we do not sell your data. The data you share with us is used to help match you with relevant jobs and autofill your applications. Simplify also operates as a hiring marketplace, meaning recruiters often use Simplify to post exclusive opportunities and find perfect-fit candidates (like you!). None of your data is shared with anyone off-platform without your consent – that's a promise!",
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
