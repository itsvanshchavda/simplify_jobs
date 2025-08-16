"use client";
import { usePathname } from "next/navigation";

import { Suspense } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const routes = [
        "/",
        "/copilot",
        "/job-tracker",
        "/resume-builder",
        "/auth/forgot-password",

    ];

    const showLayout = routes.includes(pathname);

    return (
        <>
            <Suspense fallback={<div />}>{showLayout && <Navbar />}</Suspense>
            {children}
            {showLayout && <Footer />}
        </>
    );
}