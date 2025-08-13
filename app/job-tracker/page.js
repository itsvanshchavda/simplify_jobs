import FAQ from "@/components/common/FAQ";
import Testimonials from "@/components/common/testimonials";
import JobTrackerFeatures from "@/sections/jobtracker/jobtrackerfeatures";
import JobTrackerHero from "@/sections/jobtracker/jobtrackerhero";
import React from "react";

const page = () => {
  const data = [
    {
      question: "What is a job tracker? Can't I just use a spreadsheet?",
      answer:
        "A job tracker is simply a tool used by job seekers to organize and manage job applications and interviews during an ongoing job search. This can be something as basic as a spreadsheet or something as feature-rich as Simplify's free job tracker. The goal of a good job tracker is to help you keep track of upcoming interviews, referrals, notes, and remind you to follow-up with recruiters. A good job tracker can vastly improve the efficiency of your job search and help you get hired faster!",
    },
    {
      question: "How much does the job tracker cost?",
      answer:
        "Simplify's job tracker is free – and we plan to keep it that way! We started Simplify with a mission to give job seekers the tools they need to succeed in their job search. Our job tracker is designed to help you stay organized throughout your search and stay on top of upcoming interviews/deadlines. Our autofill extension, application tracker, and job matches are all free features we commit to keeping free – forever.",
    },

    {
      question:
        "What's the best way to track job applications? How should I be using Simplify?",
      answer:
        "Our recruiters recommend bookmarking jobs you're excited about and crafting tailored resumes and cover letters before you apply. You can save these documents within Simplify's job tracker and record notes from your interviews. When you move forward in the recruiting process for a given job, you can easily update your status which helps you visualize where you are in your search. Before any interview, you'll be able to see all the notes, referrals, and documents you used in the process and increase your chances of landing that offer!",
    },
  ];
  return (
    <div>
      <JobTrackerHero />
      <JobTrackerFeatures />
      <Testimonials />
      <FAQ data={data} />
    </div>
  );
};

export default page;
