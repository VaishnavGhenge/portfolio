"use client";

import React from "react";

interface ClientTiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function ClientTiltCard({ children, className = "" }: ClientTiltCardProps) {
    return <div className={className}>{children}</div>;
}
