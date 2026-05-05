export default function EditorialCartoon() {
    const agentLines = [
        "agent: feature complete",
        "diff: +4,812 -18",
        "tests: passed locally",
        "todo: define locally",
    ];

    const alerts = [
        { label: "CI", detail: "1 flaky test", fill: "#fee2e2", stroke: "#b91c1c" },
        { label: "SEC", detail: "new CVE", fill: "#fff7ed", stroke: "#c2410c" },
        { label: "PM", detail: "ship today?", fill: "#ecfeff", stroke: "#0e7490" },
    ];

    const prs = [
        { id: "#841", title: "auth refactor", y: 195, rotate: -7 },
        { id: "#842", title: "fix auth", y: 207, rotate: 5 },
        { id: "#843", title: "fix fix", y: 219, rotate: -4 },
    ];

    return (
        <div className="mb-16">
            <div className="mb-5 text-center">
                <p className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                    - Editorial -
                </p>
                <h2 className="font-serif text-xl font-bold tracking-tight text-stone-900">
                    Consequences Engineer
                </h2>
            </div>

            <div className="border-2 border-stone-900 mx-auto bg-white" style={{ maxWidth: 520 }}>
                <svg
                    viewBox="0 0 520 336"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                    role="img"
                    aria-labelledby="editorial-cartoon-title"
                >
                    <title id="editorial-cartoon-title">
                        Editorial cartoon: an AI coding agent says it passed imaginary tests while a developer inherits review, CI failures, security warnings, and product pressure.
                    </title>
                    <defs>
                        <pattern id="cartoon-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M-2 8 L8 -2 M2 10 L10 2" stroke="#1c1917" strokeWidth="0.6" opacity="0.12" />
                        </pattern>
                        <filter id="cartoon-shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="2" dy="3" stdDeviation="0" floodColor="#1c1917" floodOpacity="0.18" />
                        </filter>
                    </defs>

                    <rect width="520" height="336" fill="#faf8f4" />
                    <rect x="14" y="14" width="492" height="278" fill="url(#cartoon-hatch)" opacity="0.9" />
                    <line x1="18" y1="260" x2="502" y2="260" stroke="#1c1917" strokeWidth="2" />

                    {/* Agent console */}
                    <g filter="url(#cartoon-shadow)">
                        <rect x="26" y="36" width="190" height="142" rx="5" fill="#1c1917" stroke="#1c1917" strokeWidth="2" />
                        <rect x="26" y="36" width="190" height="24" rx="5" fill="#292524" />
                        <rect x="26" y="52" width="190" height="8" fill="#292524" />
                        <circle cx="42" cy="48" r="4" fill="#ef4444" opacity="0.8" />
                        <circle cx="56" cy="48" r="4" fill="#f59e0b" opacity="0.8" />
                        <circle cx="70" cy="48" r="4" fill="#22c55e" opacity="0.8" />
                        <text x="121" y="51" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a8a29e">
                            ai-agent run
                        </text>
                        {agentLines.map((line, i) => (
                            <text
                                key={line}
                                x="42"
                                y={84 + i * 22}
                                fontFamily="monospace"
                                fontSize="10"
                                fill={i === 0 ? "#86efac" : i === 2 ? "#fde68a" : "#e7e5e4"}
                            >
                                {line}
                            </text>
                        ))}
                        <rect x="42" y="154" width="8" height="12" fill="#a8a29e" opacity="0.7" />
                    </g>

                    {/* Robot agent */}
                    <g transform="translate(238 42)" filter="url(#cartoon-shadow)">
                        <path d="M43 19 L48 4" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="49" cy="3" r="3" fill="#f97316" stroke="#1c1917" strokeWidth="1.5" />
                        <rect x="10" y="20" width="76" height="62" rx="12" fill="#e0f2fe" stroke="#1c1917" strokeWidth="2" />
                        <rect x="23" y="35" width="50" height="21" rx="5" fill="#faf8f4" stroke="#1c1917" strokeWidth="1.5" />
                        <circle cx="38" cy="45" r="3.5" fill="#0f766e" />
                        <circle cx="58" cy="45" r="3.5" fill="#0f766e" />
                        <path d="M39 61 Q48 68 59 61" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                        <rect x="31" y="82" width="35" height="30" rx="6" fill="#bae6fd" stroke="#1c1917" strokeWidth="2" />
                        <path d="M10 50 C-7 54 -9 78 5 86" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M86 50 C107 54 105 80 91 90" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <rect x="93" y="82" width="54" height="28" rx="3" fill="#fef3c7" stroke="#1c1917" strokeWidth="1.8" />
                        <text x="120" y="100" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#1c1917">
                            DONE!
                        </text>
                    </g>

                    {/* Robot speech bubble */}
                    <g>
                        <path
                            d="M306 28 H448 Q462 28 462 42 V84 Q462 98 448 98 H344 L328 115 L331 98 H306 Q292 98 292 84 V42 Q292 28 306 28 Z"
                            fill="#ffffff"
                            stroke="#1c1917"
                            strokeWidth="2"
                        />
                        <text x="313" y="51" fontFamily="Georgia, serif" fontSize="14" fill="#1c1917">
                            I passed the tests
                        </text>
                        <text x="313" y="73" fontFamily="Georgia, serif" fontSize="14" fill="#1c1917">
                            I imagined.
                        </text>
                    </g>

                    {/* Alert stack */}
                    <g>
                        {alerts.map((alert, i) => (
                            <g key={alert.label} transform={`translate(${332 + i * 48} ${128 + i * 9}) rotate(${i === 1 ? 4 : -5})`}>
                                <rect width="90" height="42" rx="5" fill={alert.fill} stroke={alert.stroke} strokeWidth="1.8" />
                                <text x="10" y="17" fontFamily="monospace" fontSize="12" fontWeight="700" fill={alert.stroke}>
                                    {alert.label}
                                </text>
                                <text x="10" y="32" fontFamily="monospace" fontSize="9" fill="#44403c">
                                    {alert.detail}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Pull request paperwork */}
                    <g>
                        <path d="M210 205 C260 187 322 190 366 210" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
                        <path d="M210 218 C260 200 322 203 366 223" stroke="#78716c" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
                        {prs.map((pr, i) => (
                            <g key={pr.id} transform={`translate(${221 + i * 34} ${pr.y}) rotate(${pr.rotate})`} filter="url(#cartoon-shadow)">
                                <rect width="80" height="44" rx="3" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
                                <path d="M0 10 H80" stroke="#1c1917" strokeWidth="1" opacity="0.25" />
                                <text x="9" y="25" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#1c1917">
                                    PR {pr.id}
                                </text>
                                <text x="9" y="38" fontFamily="monospace" fontSize="8" fill="#57534e">
                                    {pr.title}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Developer and review desk */}
                    <g filter="url(#cartoon-shadow)">
                        <rect x="330" y="222" width="154" height="14" rx="2" fill="#d6d3d1" stroke="#1c1917" strokeWidth="1.8" />
                        <rect x="346" y="236" width="8" height="42" rx="1" fill="#d6d3d1" stroke="#1c1917" strokeWidth="1.2" />
                        <rect x="466" y="236" width="8" height="42" rx="1" fill="#d6d3d1" stroke="#1c1917" strokeWidth="1.2" />
                        <rect x="384" y="174" width="56" height="52" rx="9" fill="#faf8f4" stroke="#1c1917" strokeWidth="2" />
                        <circle cx="412" cy="149" r="24" fill="#faf8f4" stroke="#1c1917" strokeWidth="2" />
                        <path d="M390 145 Q397 125 416 124 Q431 125 436 143 Q421 135 406 138 Q398 139 390 145 Z" fill="#1c1917" />
                        <rect x="395" y="149" width="16" height="8" rx="4" stroke="#1c1917" strokeWidth="1.5" />
                        <rect x="416" y="149" width="16" height="8" rx="4" stroke="#1c1917" strokeWidth="1.5" />
                        <line x1="411" y1="153" x2="416" y2="153" stroke="#1c1917" strokeWidth="1.5" />
                        <path d="M405 166 Q413 161 421 166" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                        <path d="M391 191 C366 195 356 209 354 222" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M435 190 C457 196 462 208 460 222" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <rect x="349" y="204" width="45" height="27" rx="3" fill="#fee2e2" stroke="#1c1917" strokeWidth="1.5" transform="rotate(-7 349 204)" />
                        <text x="360" y="222" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#991b1b" transform="rotate(-7 360 222)">
                            REVIEW
                        </text>
                    </g>

                    {/* Developer speech bubble */}
                    <g>
                        <path
                            d="M39 196 H181 Q194 196 194 209 V241 Q194 254 181 254 H92 L72 272 L77 254 H39 Q26 254 26 241 V209 Q26 196 39 196 Z"
                            fill="#ffffff"
                            stroke="#1c1917"
                            strokeWidth="2"
                        />
                        <text x="44" y="219" fontFamily="Georgia, serif" fontSize="14" fill="#1c1917">
                            Great. I will run
                        </text>
                        <text x="44" y="240" fontFamily="Georgia, serif" fontSize="14" fill="#1c1917">
                            the real ones.
                        </text>
                    </g>

                    {/* Newspaper-style signature marks */}
                    <text x="28" y="314" fontFamily="monospace" fontSize="9" fill="#78716c">
                        MODERN DEVELOPMENT, 2026
                    </text>
                    <path d="M410 304 C423 297 438 297 452 306 C461 312 473 312 486 303" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.45" />
                </svg>

                <div className="border-t-2 border-stone-900 px-5 py-3 bg-white">
                    <p className="text-sm text-center text-stone-700" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                        &quot;The AI wrote the code. I got promoted to consequences engineer.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
