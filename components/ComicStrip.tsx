/**
 * "The Night Shift", a four-panel strip. The camera never moves: the story is
 * told by what changes between panels (the clock, the moon crossing the window,
 * the coffee going cold, the screen, the face). The duck does not change. That
 * is the joke.
 */

type Face = "focus" | "explain" | "eureka" | "glad";
type Arm = "rest" | "gesture" | "chin";

interface Panel {
    time: string;
    alt: string;
    face: Face;
    arm: Arm;
    pass: boolean;
    steam: 0 | 1 | 2;
    moonShift: number;
    speech?: [string, string];
    narration?: string;
}

const panels: Panel[] = [
    {
        time: "11:02 P.M.",
        alt: "11:02 p.m. The developer frowns at a failing test on the laptop, coffee still steaming. \"One failing test. Ten minutes, tops.\"",
        face: "focus", arm: "rest", pass: false, steam: 2, moonShift: -48,
        speech: ["ONE FAILING TEST.", "TEN MINUTES, TOPS."],
    },
    {
        time: "1:15 A.M.",
        alt: "1:15 a.m. The developer turns to the rubber duck and explains, hand raised: \"So, duck: the retry fires, then the webhook...\"",
        face: "explain", arm: "gesture", pass: false, steam: 1, moonShift: -32,
        speech: ["SO, DUCK: THE RETRY FIRES,", "THEN THE WEBHOOK..."],
    },
    {
        time: "3:46 A.M.",
        alt: "3:46 a.m. The developer stops mid-sentence, eyes wide: \"...fires twice. Oh no.\" The duck has not moved.",
        face: "eureka", arm: "rest", pass: false, steam: 0, moonShift: -16,
        speech: ["...FIRES TWICE.", "OH NO."],
    },
    {
        time: "3:47 A.M.",
        alt: "3:47 a.m. The tests pass. The developer rests their chin in one hand and smiles at the duck. Caption: the duck heard it first.",
        face: "glad", arm: "chin", pass: true, steam: 0, moonShift: 0,
        narration: "THE DUCK HEARD IT FIRST.",
    },
];

const INK = "#1c1917";
const PAPER = "#faf8f4";

// ─── Shared defs (rendered once, referenced by every panel) ──────────────────

function StripDefs() {
    return (
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
            <defs>
                {/* Displacement gives every clean path a hand-inked wobble. */}
                <filter id="strip-ink" x="-6%" y="-6%" width="112%" height="112%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.017" numOctaves="3" seed="11" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.9" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <pattern id="strip-night" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
                    <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="0.55" opacity="0.5" />
                </pattern>
                <linearGradient id="strip-cone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="strip-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#fdba74" stopOpacity="0.34" />
                    <stop offset="55%" stopColor="#fcd34d" stopOpacity="0.13" />
                    <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
}

// ─── Scene pieces ─────────────────────────────────────────────────────────────

function Room({ moonShift }: { moonShift: number }) {
    return (
        <>
            {/* Window: night sky, the moon a little further across each panel */}
            <path
                d="M398 30 C430 27, 466 28, 494 30 C496 56, 495 84, 494 106 C462 109, 428 109, 398 106 C396 82, 397 54, 398 30 Z"
                fill="#f3ede3"
                strokeWidth="2.4"
            />
            <path
                d="M398 30 C430 27, 466 28, 494 30 C496 56, 495 84, 494 106 C462 109, 428 109, 398 106 C396 82, 397 54, 398 30 Z"
                fill="url(#strip-night)"
                stroke="none"
                opacity="0.75"
            />
            <path
                d="M477 44 C468 47, 463 55, 465 63 C467 71, 476 76, 484 73 C477 69, 473 62, 474 55 C475 50, 475 46, 477 44 Z"
                fill={PAPER}
                strokeWidth="1.3"
                transform={`translate(${moonShift} ${-moonShift / 4})`}
            />
            <path d="M417 52 L417 60 M413 56 L421 56" strokeWidth="1.1" opacity="0.6" />
            <path d="M434 84 L434 90 M431 87 L437 87" strokeWidth="1" opacity="0.5" />
            <path d="M446 29 C447 56, 446 82, 446 107" strokeWidth="1.6" />
            <path d="M398 68 C430 66, 464 67, 494 67" strokeWidth="1.6" />

            {/* Pendant lamp */}
            <path d="M250 -70 C251 -30, 249 10, 250 40" strokeWidth="1.8" />
            <path d="M216 66 C228 43, 233 40, 250 40 C267 40, 272 43, 284 66 C266 71, 234 71, 216 66 Z" fill={PAPER} strokeWidth="2.4" />
            <path d="M245 70 C245 76, 248 79, 251 79 C254 79, 256 76, 256 70 Z" fill="#fbbf24" strokeWidth="1.3" />

            {/* Desk */}
            <path d="M14 246 C150 243, 370 249, 506 245 L506 264 C370 268, 150 262, 14 265 Z" fill="#f0eae0" strokeWidth="2.4" />
            <path d="M14 265 C150 262, 370 268, 506 264" strokeWidth="1.4" opacity="0.5" />
            <path d="M14 268 C160 265, 380 271, 506 267" strokeWidth="1.2" opacity="0.3" />
        </>
    );
}

function Laptop({ pass }: { pass: boolean }) {
    return (
        <>
            <path
                d="M118 245 C120 215, 124 191, 128 173 C160 170, 200 168, 228 167 C228 191, 229 217, 230 241 C196 242, 150 244, 118 245 Z"
                fill={PAPER}
                strokeWidth="2.4"
            />
            <path
                d="M127 238 C129 213, 132 193, 135 179 C162 176, 196 175, 221 174 C221 195, 222 216, 222 235 C194 236, 155 237, 127 238 Z"
                fill="#fffdf6"
                strokeWidth="1.2"
            />
            <path d="M141 189 C152 188, 162 188, 170 188" strokeWidth="1.3" opacity="0.28" />
            <path d="M141 229 C158 228, 186 227, 205 227" strokeWidth="1.3" opacity="0.28" />
            {pass ? (
                <path d="M156 206 L168 218 L196 191" stroke="#15803d" strokeWidth="4.2" />
            ) : (
                <path d="M162 194 L188 220 M188 194 L162 220" stroke="#b91c1c" strokeWidth="4.2" />
            )}
            <path d="M112 246 C140 243, 200 241, 230 240 L248 248 C214 251, 148 253, 120 254 Z" fill="#f7f2e9" strokeWidth="2.2" />
        </>
    );
}

function Mug({ steam }: { steam: 0 | 1 | 2 }) {
    return (
        <>
            <path d="M74 226 C73 240, 78 246, 86 246 C94 246, 99 240, 98 226 C90 224, 82 224, 74 226 Z" fill={PAPER} strokeWidth="2.2" />
            <path d="M98 230 C107 228, 109 237, 100 240" strokeWidth="1.8" />
            {steam >= 1 && <path d="M82 218 C77 210, 87 204, 82 194" strokeWidth="1.5" opacity="0.6" />}
            {steam >= 2 && <path d="M91 218 C86 208, 96 202, 91 190" strokeWidth="1.5" opacity="0.6" />}
        </>
    );
}

function Duck() {
    return (
        <>
            <path d="M248 244 C240 232, 245 218, 259 215 C274 212, 287 220, 289 232 C290 240, 286 244, 282 245 C271 246, 258 246, 248 244 Z" fill="#fcd34d" strokeWidth="2.3" />
            <path d="M277 214 C273 204, 278 194, 288 193 C297 192, 304 199, 304 208 C304 214, 300 219, 294 220 C287 221, 280 219, 277 214 Z" fill="#fcd34d" strokeWidth="2.3" />
            <path d="M303 205 C310 202, 316 205, 315 210 C314 214, 307 214, 302 211 Z" fill="#f97316" strokeWidth="1.6" />
            <path d="M293 202 C295 202, 296 204, 295 206 C293 207, 291 205, 293 202 Z" fill={INK} strokeWidth="0.8" />
            <path d="M257 229 C264 224, 275 226, 278 233" strokeWidth="1.7" />
            <path d="M240 247 C258 250, 282 250, 296 247" strokeWidth="1.2" opacity="0.35" />
        </>
    );
}

function FaceDetail({ face }: { face: Face }) {
    switch (face) {
        case "focus": // eyes on the laptop, brows pulled in
            return (
                <>
                    <circle cx="373" cy="126" r="2.3" fill={INK} strokeWidth="0" />
                    <circle cx="402" cy="126" r="2.3" fill={INK} strokeWidth="0" />
                    <path d="M369 111 L385 115 M398 115 L414 111" strokeWidth="1.9" />
                    <path d="M385 148 C391 146, 397 146, 401 148" strokeWidth="1.9" />
                </>
            );
        case "explain": // looking down at the duck, mid-sentence
            return (
                <>
                    <circle cx="372" cy="129" r="2.3" fill={INK} strokeWidth="0" />
                    <circle cx="401" cy="129" r="2.3" fill={INK} strokeWidth="0" />
                    <path d="M369 112 C375 110, 381 110, 386 112 M397 112 C403 110, 409 110, 414 112" strokeWidth="1.7" />
                    <ellipse cx="392" cy="147" rx="5" ry="3.5" fill={INK} strokeWidth="1" />
                </>
            );
        case "eureka": // it clicks
            return (
                <>
                    <circle cx="378" cy="125" r="1.8" fill={INK} strokeWidth="0" />
                    <circle cx="407" cy="125" r="1.8" fill={INK} strokeWidth="0" />
                    <path d="M368 106 C374 101, 381 101, 386 105 M397 105 C403 101, 410 101, 415 106" strokeWidth="1.9" />
                    <ellipse cx="392" cy="148" rx="4" ry="5" fill={INK} strokeWidth="1" />
                    {/* Shock marks */}
                    <path d="M352 60 L356 82" strokeWidth="3" />
                    <circle cx="357.5" cy="90" r="2" fill={INK} strokeWidth="0" />
                    <path d="M341 78 L333 74 M343 92 L334 94" strokeWidth="1.6" />
                </>
            );
        case "glad": // tired, but glad
            return (
                <>
                    <path d="M372 127 C375 122, 381 122, 384 127" strokeWidth="1.9" />
                    <path d="M401 127 C404 122, 410 122, 413 127" strokeWidth="1.9" />
                    <path d="M373 133 C377 135, 381 135, 384 134" strokeWidth="1.1" opacity="0.4" />
                    <path d="M402 133 C406 135, 410 135, 413 134" strokeWidth="1.1" opacity="0.4" />
                    <path d="M383 145 C389 151, 398 150, 403 143" strokeWidth="2" />
                </>
            );
    }
}

function LeftArm({ arm }: { arm: Arm }) {
    switch (arm) {
        case "rest":
            return (
                <>
                    <path d="M364 190 C350 205, 342 224, 340 244" strokeWidth="3.2" />
                    <path d="M332 244 C331 238, 336 235, 342 236 C348 237, 350 242, 347 246 C343 249, 335 249, 332 244 Z" fill={PAPER} strokeWidth="1.9" />
                </>
            );
        case "gesture": // open palm towards the duck
            return (
                <>
                    <path d="M364 190 C352 197, 340 197, 330 188" strokeWidth="3.2" />
                    <path d="M312 180 C312 172, 320 168, 326 171 C332 174, 332 184, 327 188 C321 192, 312 189, 312 180 Z" fill={PAPER} strokeWidth="1.9" />
                    <path d="M316 172 L312 164 M321 170 L319 161 M326 171 L327 163" strokeWidth="1.6" />
                </>
            );
        case "chin":
            return (
                <>
                    <path d="M364 190 C349 204, 341 224, 339 243" strokeWidth="3.2" />
                    <path d="M339 243 C341 211, 351 176, 365 157" strokeWidth="3.2" />
                    <path d="M359 152 C358 142, 365 135, 373 137 C380 139, 382 147, 378 154 C373 160, 362 159, 359 152 Z" fill={PAPER} strokeWidth="1.9" />
                    <path d="M366 139 C368 143, 369 148, 368 154" strokeWidth="1.2" opacity="0.55" />
                    <path d="M372 140 C374 144, 375 148, 374 153" strokeWidth="1.2" opacity="0.55" />
                </>
            );
    }
}

function Developer({ face, arm }: { face: Face; arm: Arm }) {
    return (
        <>
            {/* Body and neck */}
            <path d="M358 248 C354 212, 363 181, 383 173 C394 169, 405 170, 413 176 C429 189, 437 216, 437 248 Z" fill={PAPER} strokeWidth="2.5" />
            <path d="M382 156 C383 164, 383 169, 382 174" strokeWidth="2" />
            <path d="M402 155 C402 163, 403 169, 404 173" strokeWidth="2" />

            {/* Head and hair */}
            <path d="M363 128 C361 108, 372 94, 390 93 C408 92, 419 105, 419 124 C419 143, 408 157, 391 158 C374 159, 364 146, 363 128 Z" fill={PAPER} strokeWidth="2.5" />
            <path d="M363 119 C361 100, 373 87, 391 87 C407 87, 418 96, 420 110 C412 100, 400 96, 388 98 C376 100, 367 108, 363 119 Z" fill={INK} strokeWidth="1.4" />
            <path d="M399 88 C403 82, 409 81, 412 84" strokeWidth="1.6" />
            <path d="M392 86 C394 80, 399 78, 402 80" strokeWidth="1.4" />

            {/* Glasses */}
            <path d="M367 124 C367 118, 373 115, 380 116 C387 117, 389 122, 388 127 C387 133, 380 135, 374 134 C369 133, 367 129, 367 124 Z" strokeWidth="1.8" />
            <path d="M396 124 C396 118, 402 115, 409 116 C416 117, 418 122, 417 127 C416 133, 409 135, 403 134 C398 133, 396 129, 396 124 Z" strokeWidth="1.8" />
            <path d="M388 124 C391 122, 393 122, 396 124" strokeWidth="1.5" />

            <FaceDetail face={face} />
            <LeftArm arm={arm} />

            {/* Other arm, resting */}
            <path d="M417 184 C432 197, 440 221, 442 244" strokeWidth="3.2" />
            <path d="M434 244 C433 238, 438 235, 444 236 C450 237, 452 242, 449 246 C445 249, 437 249, 434 244 Z" fill={PAPER} strokeWidth="1.9" />
        </>
    );
}

// ─── Lettering ────────────────────────────────────────────────────────────────

function Caption({ x, y, width, text }: { x: number; y: number; width: number; text: string }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height="28" fill="#fef3c7" stroke={INK} strokeWidth="2" />
            <text x={x + width / 2} y={y + 19.5} textAnchor="middle" fontSize="15" letterSpacing="0.8" fill={INK} className="font-mono">
                {text}
            </text>
        </g>
    );
}

function Speech({ lines }: { lines: [string, string] }) {
    return (
        <g>
            {/* Balloon with its tail pointing down at the speaker, clear of the window */}
            <path
                d="M180 -40 C180 -52, 188 -58, 200 -58 L478 -58 C490 -58, 498 -52, 498 -40 L498 -8 C498 4, 490 10, 478 10 L386 10 L376 80 L358 10 L200 10 C188 10, 180 4, 180 -8 Z"
                fill="#fff"
                stroke={INK}
                strokeWidth="2.2"
                strokeLinejoin="round"
            />
            {lines.map((line, i) => (
                <text key={i} x="339" y={-29 + i * 25} textAnchor="middle" fontSize="19" fontWeight="500" letterSpacing="0.3" fill={INK} className="font-mono">
                    {line}
                </text>
            ))}
        </g>
    );
}

function PanelArt({ panel, index }: { panel: Panel; index: number }) {
    const titleId = `strip-panel-${index}`;

    return (
        <svg viewBox="40 -70 470 360" className="block w-full" role="img" aria-labelledby={titleId}>
            <title id={titleId}>{`Panel ${index + 1}. ${panel.alt}`}</title>

            {/* Room: dark everywhere the lamp does not reach */}
            <rect x="40" y="-70" width="470" height="360" fill={PAPER} />
            <rect x="40" y="-70" width="470" height="340" fill="url(#strip-night)" opacity="0.42" />
            <path d="M220 66 L90 250 L430 250 L280 66 Z" fill="url(#strip-cone)" />
            <ellipse cx="250" cy="162" rx="205" ry="152" fill="url(#strip-glow)" />

            <g filter="url(#strip-ink)" stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <Room moonShift={panel.moonShift} />
                <Mug steam={panel.steam} />
                <Laptop pass={panel.pass} />
                <Duck />
                <Developer face={panel.face} arm={panel.arm} />
            </g>

            {/* Lettering stays outside the wobble filter so it reads cleanly */}
            <Caption x={46} y={-64} width={120} text={panel.time} />
            {panel.speech && <Speech lines={panel.speech} />}
            {panel.narration && <Caption x={236} y={257} width={268} text={panel.narration} />}
        </svg>
    );
}

// ─── Strip ────────────────────────────────────────────────────────────────────

export default function ComicStrip() {
    return (
        <figure>
            <StripDefs />

            <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-900">The Night Shift</h3>
                <span className="rubric text-stone-600">by v.g.</span>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {panels.map((panel, i) => (
                    <li key={panel.time} className="overflow-hidden border-2 border-stone-900 bg-white">
                        <PanelArt panel={panel} index={i} />
                    </li>
                ))}
            </ol>
        </figure>
    );
}
