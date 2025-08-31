"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Header from "./header";
import BasicHeader from "./basicheader";

export default function DashboardWrapper({ children }) {
    const pathname = usePathname();
    // Special case: show basic header
    if (pathname === "/dashboard/documents/resume/new") {
        return (
            <>
                <Suspense fallback={<div />}>
                    <BasicHeader />
                </Suspense>
                {children}
            </>
        );
    }

    // Default: show normal header (all other dashboard pages)
    if (pathname.startsWith("/dashboard") && !pathname.includes('/resume') && !pathname.includes('/coverletter')) {
        return (
            <>
                <Suspense fallback={<div />}>
                    <Header />
                </Suspense>
                {children}
            </>
        );
    }

    // fallback (non-dashboard routes, show no header)
    return <>{children}</>;
}
