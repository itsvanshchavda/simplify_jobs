"use client";

import DashboardWrapper from "@/components/dashboardwrapper";
import Loader from "@/components/loader";
import React, { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="flex bg-gray-50 flex-col flex-1 h-full">
          {/* Scrollable content area */}
          <main className="flex-1  h-full overflow-y-auto">
            <DashboardWrapper>{children}</DashboardWrapper>
          </main>
        </div>

        {/* <CompleteProfilePopUp /> */}
      </div>
    </Suspense>
  );
};

export default Layout;
