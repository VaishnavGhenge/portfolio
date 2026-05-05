"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ResumeWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const modal = isOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
            <div
                className="absolute inset-0 bg-stone-900/70"
                onClick={() => setIsOpen(false)}
            />
            <div className="relative w-full max-w-5xl h-[85vh] bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col z-10">
                <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
                    <span className="text-sm font-medium text-stone-700">Resume</span>
                    <div className="flex items-center gap-4">
                        <a
                            href="/resume.pdf"
                            download="Vaishnav_Ghenge_Resume.pdf"
                            className="text-xs text-amber-800 hover:text-amber-700 underline underline-offset-2 transition-colors"
                        >
                            Download PDF
                        </a>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-stone-400 hover:text-stone-900 transition-colors"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <iframe src="/resume.pdf" className="absolute inset-0 w-full h-full border-0" title="Resume PDF" />
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                aria-label="View Resume"
                className="hover:text-stone-900 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                </svg>
            </button>
            {mounted && createPortal(modal, document.body)}
        </>
    );
}
