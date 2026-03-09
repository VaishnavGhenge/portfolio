"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseSpotlight() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            const lerp = 0.08;
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
            setPos({ x: currentRef.current.x, y: currentRef.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30"
            style={{
                background: `
                    radial-gradient(220px at ${pos.x}px ${pos.y}px, rgba(20, 184, 166, 0.10), transparent 100%),
                    radial-gradient(700px at ${pos.x}px ${pos.y}px, rgba(29, 78, 216, 0.06), transparent 80%)
                `,
            }}
        />
    );
}
