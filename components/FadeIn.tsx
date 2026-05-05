"use client";

import React from "react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function FadeIn({ children, className = "" }: FadeInProps) {
    return <div className={className}>{children}</div>;
}
