'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress options (disable spinner, adjust speed)
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 });

export default function Loading() {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    return null;
}
