'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';
import 'nprogress/nprogress.css';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.2,

});

export default function ProgressProvider({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 300); // Adjust for smoother finish

        return () => clearTimeout(timeout);
    }, [pathname]);

    return <>{children}</>;
}
