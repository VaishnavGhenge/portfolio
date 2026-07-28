export default function EditorialCartoon() {
    return (
        <div>
            <div className="mb-5 text-center">
                <h3 className="font-serif text-xl font-bold tracking-tight text-stone-900">
                    First Reader
                </h3>
            </div>

            <figure className="mx-auto border-2 border-stone-900 bg-white" style={{ maxWidth: 520 }}>
                <svg
                    viewBox="0 0 520 320"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                    role="img"
                    aria-labelledby="cartoon-title"
                >
                    <title id="cartoon-title">
                        Editorial cartoon: a tired developer sits at a desk late at night, chin
                        resting in one hand, smiling at a rubber duck beside the laptop. On the
                        laptop screen, the tests have finally passed.
                    </title>

                    <defs>
                        {/* Displacement gives every clean path a hand-inked wobble. */}
                        <filter id="ink" x="-6%" y="-6%" width="112%" height="112%">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.017"
                                numOctaves="3"
                                seed="11"
                                result="noise"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="noise"
                                scale="1.9"
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                        </filter>

                        <pattern
                            id="night"
                            width="7"
                            height="7"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(38)"
                        >
                            <line x1="0" y1="0" x2="0" y2="7" stroke="#1c1917" strokeWidth="0.55" opacity="0.5" />
                        </pattern>

                        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
                        </linearGradient>

                        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.34" />
                            <stop offset="55%" stopColor="#fcd34d" stopOpacity="0.13" />
                            <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Room: dark everywhere the lamp does not reach */}
                    <rect width="520" height="320" fill="#faf8f4" />
                    <rect width="520" height="298" fill="url(#night)" opacity="0.42" />
                    <path d="M220 66 L90 250 L430 250 L280 66 Z" fill="url(#cone)" />
                    <ellipse cx="250" cy="162" rx="205" ry="152" fill="url(#glow)" />

                    <g
                        filter="url(#ink)"
                        stroke="#1c1917"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Window — night sky, one crescent moon */}
                        <path
                            d="M398 30 C430 27, 466 28, 494 30 C496 56, 495 84, 494 106 C462 109, 428 109, 398 106 C396 82, 397 54, 398 30 Z"
                            fill="#f3ede3"
                            strokeWidth="2.4"
                        />
                        <path
                            d="M398 30 C430 27, 466 28, 494 30 C496 56, 495 84, 494 106 C462 109, 428 109, 398 106 C396 82, 397 54, 398 30 Z"
                            fill="url(#night)"
                            stroke="none"
                            opacity="0.75"
                        />
                        <path
                            d="M477 44 C468 47, 463 55, 465 63 C467 71, 476 76, 484 73 C477 69, 473 62, 474 55 C475 50, 475 46, 477 44 Z"
                            fill="#faf8f4"
                            strokeWidth="1.3"
                        />
                        <path d="M417 52 L417 60 M413 56 L421 56" strokeWidth="1.1" opacity="0.6" />
                        <path d="M434 84 L434 90 M431 87 L437 87" strokeWidth="1" opacity="0.5" />
                        <path d="M446 29 C447 56, 446 82, 446 107" strokeWidth="1.6" />
                        <path d="M398 68 C430 66, 464 67, 494 67" strokeWidth="1.6" />

                        {/* Pendant lamp */}
                        <path d="M250 0 C251 14, 249 28, 250 40" strokeWidth="1.8" />
                        <path
                            d="M216 66 C228 43, 233 40, 250 40 C267 40, 272 43, 284 66 C266 71, 234 71, 216 66 Z"
                            fill="#faf8f4"
                            strokeWidth="2.4"
                        />
                        <path
                            d="M245 70 C245 76, 248 79, 251 79 C254 79, 256 76, 256 70 Z"
                            fill="#fbbf24"
                            strokeWidth="1.3"
                        />

                        {/* Desk */}
                        <path
                            d="M14 246 C150 243, 370 249, 506 245 L506 264 C370 268, 150 262, 14 265 Z"
                            fill="#f0eae0"
                            strokeWidth="2.4"
                        />
                        <path d="M14 265 C150 262, 370 268, 506 264" strokeWidth="1.4" opacity="0.5" />

                        {/* Laptop — the tests have passed */}
                        <path
                            d="M118 245 C120 215, 124 191, 128 173 C160 170, 200 168, 228 167 C228 191, 229 217, 230 241 C196 242, 150 244, 118 245 Z"
                            fill="#faf8f4"
                            strokeWidth="2.4"
                        />
                        <path
                            d="M127 238 C129 213, 132 193, 135 179 C162 176, 196 175, 221 174 C221 195, 222 216, 222 235 C194 236, 155 237, 127 238 Z"
                            fill="#fffdf6"
                            strokeWidth="1.2"
                        />
                        <path d="M141 189 C152 188, 162 188, 170 188" strokeWidth="1.3" opacity="0.28" />
                        <path d="M141 229 C158 228, 186 227, 205 227" strokeWidth="1.3" opacity="0.28" />
                        <path d="M156 206 L168 218 L196 191" stroke="#15803d" strokeWidth="4.2" />
                        <path
                            d="M112 246 C140 243, 200 241, 230 240 L248 248 C214 251, 148 253, 120 254 Z"
                            fill="#f7f2e9"
                            strokeWidth="2.2"
                        />

                        {/* Mug, long since gone cold */}
                        <path
                            d="M74 226 C73 240, 78 246, 86 246 C94 246, 99 240, 98 226 C90 224, 82 224, 74 226 Z"
                            fill="#faf8f4"
                            strokeWidth="2.2"
                        />
                        <path d="M98 230 C107 228, 109 237, 100 240" strokeWidth="1.8" />

                        {/* The duck */}
                        <path
                            d="M248 244 C240 232, 245 218, 259 215 C274 212, 287 220, 289 232 C290 240, 286 244, 282 245 C271 246, 258 246, 248 244 Z"
                            fill="#fcd34d"
                            strokeWidth="2.3"
                        />
                        <path
                            d="M277 214 C273 204, 278 194, 288 193 C297 192, 304 199, 304 208 C304 214, 300 219, 294 220 C287 221, 280 219, 277 214 Z"
                            fill="#fcd34d"
                            strokeWidth="2.3"
                        />
                        <path
                            d="M303 205 C310 202, 316 205, 315 210 C314 214, 307 214, 302 211 Z"
                            fill="#f97316"
                            strokeWidth="1.6"
                        />
                        <path d="M293 202 C295 202, 296 204, 295 206 C293 207, 291 205, 293 202 Z" fill="#1c1917" strokeWidth="0.8" />
                        <path d="M257 229 C264 224, 275 226, 278 233" strokeWidth="1.7" />
                        <path d="M240 247 C258 250, 282 250, 296 247" strokeWidth="1.2" opacity="0.35" />

                        {/* Developer — chin in hand, looking at the duck */}
                        <path
                            d="M358 248 C354 212, 363 181, 383 173 C394 169, 405 170, 413 176 C429 189, 437 216, 437 248 Z"
                            fill="#faf8f4"
                            strokeWidth="2.5"
                        />
                        <path d="M382 156 C383 164, 383 169, 382 174" strokeWidth="2" />
                        <path d="M402 155 C402 163, 403 169, 404 173" strokeWidth="2" />

                        <path
                            d="M363 128 C361 108, 372 94, 390 93 C408 92, 419 105, 419 124 C419 143, 408 157, 391 158 C374 159, 364 146, 363 128 Z"
                            fill="#faf8f4"
                            strokeWidth="2.5"
                        />
                        <path
                            d="M363 119 C361 100, 373 87, 391 87 C407 87, 418 96, 420 110 C412 100, 400 96, 388 98 C376 100, 367 108, 363 119 Z"
                            fill="#1c1917"
                            strokeWidth="1.4"
                        />
                        <path d="M399 88 C403 82, 409 81, 412 84" strokeWidth="1.6" />
                        <path d="M392 86 C394 80, 399 78, 402 80" strokeWidth="1.4" />

                        {/* Glasses */}
                        <path
                            d="M367 124 C367 118, 373 115, 380 116 C387 117, 389 122, 388 127 C387 133, 380 135, 374 134 C369 133, 367 129, 367 124 Z"
                            strokeWidth="1.8"
                        />
                        <path
                            d="M396 124 C396 118, 402 115, 409 116 C416 117, 418 122, 417 127 C416 133, 409 135, 403 134 C398 133, 396 129, 396 124 Z"
                            strokeWidth="1.8"
                        />
                        <path d="M388 124 C391 122, 393 122, 396 124" strokeWidth="1.5" />

                        {/* Tired, but glad */}
                        <path d="M372 127 C375 122, 381 122, 384 127" strokeWidth="1.9" />
                        <path d="M401 127 C404 122, 410 122, 413 127" strokeWidth="1.9" />
                        <path d="M373 133 C377 135, 381 135, 384 134" strokeWidth="1.1" opacity="0.4" />
                        <path d="M402 133 C406 135, 410 135, 413 134" strokeWidth="1.1" opacity="0.4" />
                        <path d="M383 145 C389 151, 398 150, 403 143" strokeWidth="2" />

                        {/* Arm propping up the chin */}
                        <path d="M364 190 C349 204, 341 224, 339 243" strokeWidth="3.2" />
                        <path d="M339 243 C341 211, 351 176, 365 157" strokeWidth="3.2" />
                        <path
                            d="M359 152 C358 142, 365 135, 373 137 C380 139, 382 147, 378 154 C373 160, 362 159, 359 152 Z"
                            fill="#faf8f4"
                            strokeWidth="1.9"
                        />
                        <path d="M366 139 C368 143, 369 148, 368 154" strokeWidth="1.2" opacity="0.55" />
                        <path d="M372 140 C374 144, 375 148, 374 153" strokeWidth="1.2" opacity="0.55" />

                        {/* Other arm, resting */}
                        <path d="M417 184 C432 197, 440 221, 442 244" strokeWidth="3.2" />
                        <path
                            d="M434 244 C433 238, 438 235, 444 236 C450 237, 452 242, 449 246 C445 249, 437 249, 434 244 Z"
                            fill="#faf8f4"
                            strokeWidth="1.9"
                        />

                        {/* Floor, unlit */}
                        <path d="M14 268 C160 265, 380 271, 506 267" strokeWidth="1.2" opacity="0.3" />
                    </g>

                    {/* Cartoonist's marks — kept outside the wobble filter so they stay crisp */}
                    <path d="M22 292 C160 290, 370 294, 498 291" stroke="#1c1917" strokeWidth="1" opacity="0.25" fill="none" />
                    <text x="24" y="310" fontFamily="monospace" fontSize="9" letterSpacing="1.4" fill="#a8a29e">
                        THE NIGHT SHIFT
                    </text>
                    <text
                        x="496"
                        y="310"
                        textAnchor="end"
                        fontFamily="Georgia, serif"
                        fontSize="12"
                        fontStyle="italic"
                        fill="#78716c"
                    >
                        — v.g.
                    </text>
                </svg>

                <figcaption className="border-t-2 border-stone-900 bg-white px-5 py-3">
                    <p className="text-center text-sm italic text-stone-700" style={{ fontFamily: "Georgia, serif" }}>
                        &ldquo;It passed at 3:47 a.m. The duck heard it first.&rdquo;
                    </p>
                </figcaption>
            </figure>
        </div>
    );
}
