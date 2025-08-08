import Navbar from "@/components/navbar";
import Features from "@/sections/hero/features";
import FeaturesGrid from "@/sections/hero/featuresgrid";
import Hero from "@/sections/hero/hero";
import JobList from "@/sections/hero/joblist";
import Testimonials from "@/sections/hero/testimonials";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FeaturesGrid />
      <JobList />
    </div>
  );
};

export default page;
