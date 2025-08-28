import BasicHeader from "@/components/basicheader";
import ShareResume from "@/sections/documents/resume/shareresume";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full bg-gray-50">
      <BasicHeader />

      <ShareResume />
    </div>
  );
};

export default page;
