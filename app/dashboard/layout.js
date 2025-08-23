"use client";

import Header from "@/components/header";
import Loader from "@/components/loader";
import React, { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header title={"Documents"} />

        <div className="flex bg-gray-50 flex-col flex-1 h-full">
          {/* Scrollable content area */}
          <main className="flex-1  h-full overflow-y-auto">{children}</main>
        </div>

        {/* <CompleteProfilePopUp /> */}
      </div>
    </Suspense>
  );
};

export default Layout;
