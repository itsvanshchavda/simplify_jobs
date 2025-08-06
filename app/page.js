import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Features from "@/sections/hero/features";
import Hero from "@/sections/hero/hero";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default page;
