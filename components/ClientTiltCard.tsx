"use client";

import React, { useRef, useState } from "react";

interface ClientTiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function ClientTiltCard({ children, className = "" }: ClientTiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        // Disable tilt on devices that don't support hover (touch devices)
        if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;

        setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-200 ease-out will-change-transform active:scale-[0.98] ${className}`}
            style={{ transform }}
        >
            {children}
        </div>
    );
}
