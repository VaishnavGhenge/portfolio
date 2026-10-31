/**
 * "Retry Logic", a Sunday-funnies strip in two tiers. Printed the way the old
 * comic sections were: flat red, teal and yellow plates, Ben-Day dots for skin,
 * and a black key plate laid down slightly out of register with the colour.
 *
 * Each scene is a list of shapes drawn twice. The colour plate paints the fills,
 * nudged a pixel or so off; the key plate paints the ink lines on top with a
 * multiply blend. Key-plate shapes are filled white, which multiplies to nothing
 * but still hides the lines of anything behind them.
 */

const INK = "#1c1917";
const PAPER = "#f6ecd2";
const RED = "#cf3b2b";
const TEAL = "#3f8c99";
const WALL = "#f1dfa0";
const WOOD = "#a4532e";
const WOOD_DARK = "#8a4426";
const DOORWAY = "#e3c77c";
const SCREEN = "#22333a";
const DUCK = "#f5c518";
const BEAK = "#e8692a";
const SKIN = "url(#bd-skin)";
const SKIN_ANGRY = "url(#bd-angry)";

const H = 330;
const FLOOR = 285;

interface Shape {
    d: string;
    fill?: string;
    /** Stroke width on the key plate; 0 for none. */
    w?: number;
    /** Colour plate only: walls, floors, anything with no outline. */
    bg?: boolean;
    /** Key plate only, unfilled: a pen line. */
    line?: boolean;
}

interface Layer { t?: string; shapes: Shape[] }

interface Balloon {
    x: number; y: number; w: number; h: number;
    /** Where the tail points. */
    tx: number; ty: number;
    lines: string[];
}

interface Panel {
    w: number;
    alt: string;
    layers: Layer[];
    balloons: Balloon[];
    caption?: string;
    credit?: string;
    signed?: boolean;
}

const ell = (cx: number, cy: number, rx: number, ry = rx) =>
    `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;

// ─── Set ──────────────────────────────────────────────────────────────────────

function room(w: number): Layer {
    return {
        shapes: [
            { d: `M0 0 H${w} V205 H0 Z`, fill: WALL, bg: true },
            { d: `M0 205 H${w} V${FLOOR} H0 Z`, fill: "url(#bd-teal)", bg: true },
            { d: `M0 ${FLOOR} H${w} V${H} H0 Z`, fill: "url(#bd-floor)", bg: true },
            { d: `M0 205 H${w} M0 ${FLOOR} H${w}`, line: true, w: 1.6 },
        ],
    };
}

function desk(x0: number, x1: number): Layer {
    return {
        shapes: [
            { d: `M${x0 - 4} 216 L${x1 + 4} 216 L${x1 + 8} 228 L${x0 - 8} 228 Z`, fill: WOOD },
            { d: `M${x0} 228 L${x1} 228 L${x1} ${FLOOR} L${x0} ${FLOOR} Z`, fill: WOOD_DARK },
            { d: `M${x0 + 10} 242 H${x1 - 10} M${x0 + 10} 264 H${x1 - 10}`, line: true, w: 1.3 },
            { d: ell((x0 + x1) / 2, 253, 3), fill: INK, w: 0 },
        ],
    };
}

function door(x: number): Layer {
    return {
        shapes: [
            { d: `M${x} 92 L${x + 70} 92 L${x + 70} ${FLOOR} L${x} ${FLOOR} Z`, fill: DOORWAY, w: 2.4 },
            { d: `M${x + 70} 92 L${x + 94} 104 L${x + 94} ${FLOOR - 4} L${x + 70} ${FLOOR} Z`, fill: TEAL, w: 2.2 },
            { d: ell(x + 88, 196, 2.6), fill: DUCK, w: 1.2 },
        ],
    };
}

function laptop(x: number, lock = false): Layer {
    const shapes: Shape[] = [
        { d: `M${x + 2} 214 L${x + 46} 214 L${x + 41} 178 L${x + 7} 178 Z`, fill: SCREEN, w: 2 },
        { d: `M${x - 4} 214 L${x + 52} 214 L${x + 56} 219 L${x - 8} 219 Z`, fill: PAPER, w: 1.8 },
    ];
    if (lock) {
        shapes.push(
            { d: `M${x + 19} 192 C${x + 19} 184 ${x + 31} 184 ${x + 31} 192`, line: true, w: 2 },
            { d: `M${x + 15} 192 H${x + 35} V206 H${x + 15} Z`, fill: DUCK, w: 1.6 },
        );
    } else {
        shapes.push({ d: `M${x + 12} 188 H${x + 30} M${x + 12} 196 H${x + 36} M${x + 12} 204 H${x + 26}`, line: true, w: 1.2 });
    }
    return { shapes };
}

function mug(x: number): Layer {
    return {
        shapes: [
            { d: `M${x} 198 L${x + 15} 198 L${x + 14} 216 L${x + 1} 216 Z`, fill: RED, w: 1.8 },
            { d: `M${x + 15} 202 C${x + 22} 202 ${x + 22} 211 ${x + 14} 211`, line: true, w: 1.6 },
        ],
    };
}

// ─── Cast ─────────────────────────────────────────────────────────────────────

/** The rubber duck. Faces right; `dir = -1` turns it round. */
function duck(x: number, y: number, s: number, dir: 1 | -1 = 1): Layer {
    return {
        t: `translate(${x} ${y}) scale(${s * dir} ${s}) translate(-240 -193)`,
        shapes: [
            { d: "M248 244 C240 232, 245 218, 259 215 C274 212, 287 220, 289 232 C290 240, 286 244, 282 245 C271 246, 258 246, 248 244 Z", fill: DUCK, w: 2.4 },
            { d: "M277 214 C273 204, 278 194, 288 193 C297 192, 304 199, 304 208 C304 214, 300 219, 294 220 C287 221, 280 219, 277 214 Z", fill: DUCK, w: 2.4 },
            { d: "M303 205 C310 202, 316 205, 315 210 C314 214, 307 214, 302 211 Z", fill: BEAK, w: 1.8 },
            { d: ell(293.5, 204, 2), fill: INK, w: 0 },
            { d: "M257 229 C264 224, 275 226, 278 233", line: true, w: 1.8 },
        ],
    };
}

type DevPose = "calm" | "explain" | "wave" | "shock" | "smug";

/**
 * The engineer, seen from the desk up. Returns the body (drawn before the desk)
 * and the hands (drawn after it, so they rest on top).
 */
function dev(x: number, pose: DevPose): [Layer, Layer] {
    const t = `translate(${x} 0)`;
    const eye = pose === "explain" ? 2.2 : pose === "shock" ? 0 : 0.6;

    const face: Shape[] = {
        calm: [
            { d: `M-15 158 L-5 159 M5 159 L15 158`, line: true, w: 1.6 },
            { d: `M-7 180 C-3 184 4 184 8 179`, line: true, w: 1.9 },
        ],
        explain: [
            { d: ell(1, 181, 5, 3.6), fill: INK, w: 0 },
        ],
        wave: [
            { d: `M-9 178 C-4 187 6 187 10 177 Z`, fill: PAPER, w: 1.8 },
        ],
        shock: [
            { d: `M-17 151 C-13 148 -8 148 -5 150 M5 150 C8 148 13 148 17 151`, line: true, w: 1.7 },
            { d: ell(1, 182, 3, 4.2), fill: INK, w: 0 },
            { d: `M31 138 C27 145 31 149 34 146 C36 143 33 140 31 138 Z`, fill: "#bfe3ea", w: 1.3 },
            { d: `M38 152 C35 157 38 160 40 158 C42 156 40 154 38 152 Z`, fill: "#bfe3ea", w: 1.2 },
        ],
        smug: [
            { d: `M-17 161 L-4 161 M4 161 L17 161`, line: true, w: 1.9 },
            { d: `M-4 181 C1 183 6 181 9 177`, line: true, w: 1.9 },
        ],
    }[pose];

    const eyes: Shape[] = pose === "smug" ? [] : [
        { d: ell(-10 + eye, pose === "shock" ? 163 : 164, pose === "shock" ? 1.4 : 2), fill: INK, w: 0 },
        { d: ell(10 + eye, pose === "shock" ? 163 : 164, pose === "shock" ? 1.4 : 2), fill: INK, w: 0 },
    ];

    const raisedArm: Shape[] = [
        { d: `M28 196 L44 170 L55 175 L38 203 Z`, fill: TEAL, w: 2 },
        { d: ell(50, 166, 7.5, 8), fill: SKIN, w: 1.8 },
    ];
    const arm: Shape[] =
        pose === "explain"
            ? [...raisedArm, { d: `M47 160 L48 145 C48 141 53 141 53 145 L54 160 Z`, fill: SKIN, w: 1.6 }]
            : pose === "wave"
              ? [...raisedArm, { d: `M62 152 C67 157 67 165 62 170 M68 147 C75 155 75 167 68 175`, line: true, w: 1.6 }]
              : [];

    const body: Layer = {
        t,
        shapes: [
            { d: `M-7 178 L-7 192 L7 192 L7 178 Z`, fill: SKIN, w: 1.8 },
            { d: `M-38 224 C-38 201 -26 190 0 190 C26 190 38 201 38 224 Z`, fill: TEAL, w: 2.4 },
            { d: `M-9 190 L0 203 L9 190 Z`, fill: PAPER, w: 1.6 },
            { d: ell(-24, 163, 5, 6), fill: SKIN, w: 1.8 },
            { d: ell(24, 163, 5, 6), fill: SKIN, w: 1.8 },
            { d: ell(0, 160, 24, 26), fill: SKIN, w: 2.4 },
            { d: `M-25 157 C-28 132 -12 124 2 126 C18 124 30 136 25 157 C21 146 12 141 4 143 C-4 139 -16 143 -25 157 Z`, fill: INK, w: 1.4 },
            { d: `M2 127 C4 118 12 116 16 121`, line: true, w: 2 },
            ...eyes,
            { d: `${ell(-10, 164, 8.5, 7.5)} ${ell(10, 164, 8.5, 7.5)}`, line: true, w: 1.8 },
            { d: `M-1.5 163 C-1 160 1 160 1.5 163 M-18.5 162 L-24 160 M18.5 162 L24 160`, line: true, w: 1.6 },
            { d: `M0 167 C-3 174 1 177 4 175`, line: true, w: 1.6 },
            ...face,
            ...arm,
        ],
    };

    const hands: Layer = {
        t,
        shapes: [
            { d: ell(-22, 221, 9, 5.5), fill: SKIN, w: 1.8 },
            ...(pose === "explain" || pose === "wave" ? [] : [{ d: ell(22, 221, 9, 5.5), fill: SKIN, w: 1.8 }]),
        ],
    };

    return [body, hands];
}

type BossPose = "burst" | "doubt" | "happy" | "paper" | "hips";

/** The boss: short, round, bald, and always arriving with news. Faces left. */
function boss(x: number, pose: BossPose): Layer {
    const angry = pose === "burst" || pose === "paper";

    const akimbo: Shape[] = [
        { d: `M-27 196 C-48 204 -48 222 -31 228`, line: true, w: 9 },
        { d: `M27 196 C48 204 48 222 31 228`, line: true, w: 9 },
        { d: ell(-29, 228, 6.5), fill: SKIN, w: 1.8 },
        { d: ell(29, 228, 6.5), fill: SKIN, w: 1.8 },
    ];

    const arms: Shape[] = {
        burst: [
            { d: `M-26 196 L-46 160 L-35 155 L-17 190 Z`, fill: INK, w: 0 },
            { d: `M26 196 L46 160 L35 155 L17 190 Z`, fill: INK, w: 0 },
            { d: ell(-42, 151, 7.5), fill: SKIN, w: 1.8 },
            { d: ell(42, 151, 7.5), fill: SKIN, w: 1.8 },
            { d: `M-58 146 L-68 141 M-60 160 L-71 160 M58 146 L68 141 M60 160 L71 160`, line: true, w: 1.8 },
        ],
        happy: [
            { d: `M-30 198 L-38 236 L-28 239 L-21 202 Z`, fill: INK, w: 0 },
            { d: `M30 198 L38 236 L28 239 L21 202 Z`, fill: INK, w: 0 },
            { d: ell(-34, 241, 6.5), fill: SKIN, w: 1.8 },
            { d: ell(34, 241, 6.5), fill: SKIN, w: 1.8 },
        ],
        paper: [
            { d: `M30 198 L38 236 L28 239 L21 202 Z`, fill: INK, w: 0 },
            { d: ell(34, 241, 6.5), fill: SKIN, w: 1.8 },
            { d: `M-24 198 L-56 204 L-56 215 L-22 210 Z`, fill: INK, w: 0 },
            { d: `M-92 186 L-58 182 L-55 228 L-89 232 Z`, fill: PAPER, w: 1.8 },
            { d: `M-86 194 L-64 192 M-86 202 L-63 200 M-85 210 L-62 208 M-85 218 L-62 216`, line: true, w: 1 },
            { d: ell(-57, 210, 6.5), fill: SKIN, w: 1.8 },
        ],
        hips: akimbo,
        doubt: akimbo,
    }[pose];

    const mouth: Shape[] =
        angry ? [{ d: ell(-10, 179, 6.5, 5.5), fill: INK, w: 0 }]
        : pose === "happy" ? [
            { d: `M-18 174 C-12 181 -4 180 0 174`, line: true, w: 1.9 },
            { d: `M-20 175 L-42 170 L-42 176 L-20 179 Z`, fill: "#7a4426", w: 1.5 },
            { d: `${ell(-48, 160, 3.5)} ${ell(-54, 148, 5)} ${ell(-50, 133, 6.5)}`, line: true, w: 1.3 },
        ]
        : pose === "doubt" ? [{ d: `M-17 177 C-12 175 -6 176 -2 178`, line: true, w: 1.9 }]
        : [{ d: `M-18 178 L-2 176`, line: true, w: 2.2 }];

    const brows = angry
        ? `M-21 138 L-7 143 M-1 143 L11 138`
        : pose === "happy" ? `M-20 141 C-16 137 -11 137 -7 140 M0 140 C3 137 8 137 11 140`
        : pose === "doubt" ? `M-20 140 L-7 142 M-1 138 C3 135 8 135 11 138`
        : `M-20 141 L-7 141 M-1 141 L11 141`;

    return {
        t: `translate(${x} 0)`,
        shapes: [
            { d: ell(-14, 283, 13, 5), fill: INK, w: 0 },
            { d: ell(16, 283, 13, 5), fill: INK, w: 0 },
            { d: `M-22 244 L-24 281 L-5 281 L-2 258 L2 258 L5 281 L24 281 L22 244 Z`, fill: INK, w: 0 },
            { d: `M-33 250 C-39 213 -28 185 0 183 C28 185 39 213 33 250 Z`, fill: INK, w: 0 },
            { d: `M-13 188 L13 188 L15 240 L0 247 L-15 240 Z`, fill: RED, w: 1.6 },
            { d: `M-9 186 L0 201 L9 186 Z`, fill: PAPER, w: 1.4 },
            { d: `M-8 189 L0 193 L8 189 L8 197 L0 193 L-8 197 Z`, fill: INK, w: 0 },
            { d: `${ell(0, 214, 1.7)} ${ell(0, 228, 1.7)}`, fill: INK, w: 0 },
            ...arms,
            { d: ell(25, 156, 6, 8), fill: angry ? SKIN_ANGRY : SKIN, w: 1.8 },
            { d: ell(0, 153, 28, 30), fill: angry ? SKIN_ANGRY : SKIN, w: 2.4 },
            { d: `M18 131 C28 123 37 133 30 141 C39 145 35 158 25 160 L21 140 Z`, fill: INK, w: 0 },
            { d: `M-4 124 L-3 115 M3 124 L6 115 M9 126 L13 118`, line: true, w: 1.8 },
            { d: brows, line: true, w: 2 },
            { d: `${ell(-13, 148, 2.1)} ${ell(4, 148, 2.1)}`, fill: INK, w: 0 },
            { d: ell(-15, 159, 8.5, 7.5), fill: angry ? SKIN_ANGRY : SKIN, w: 2 },
            { d: `M-27 167 C-19 160 -3 160 6 168 C-2 173 -18 173 -27 167 Z`, fill: INK, w: 0 },
            ...mouth,
            ...(angry ? [{ d: `M-40 120 L-32 126 M-30 112 L-28 122 M-46 130 L-36 132`, line: true, w: 2 } as Shape] : []),
        ],
    };
}

// ─── The strip ────────────────────────────────────────────────────────────────

const panels: Panel[] = [
    {
        w: 300,
        alt: "The boss bursts through the door, arms in the air: \"Say, Vaishnav! A customer's card was declined! We're ruined!\" Vaishnav, at his desk with a laptop and a rubber duck, answers: \"Relax, boss.\"",
        layers: [room(300), door(206), boss(244, "burst"), dev(88, "calm")[0], desk(12, 166), laptop(112), duck(30, 199, 0.42), dev(88, "calm")[1]],
        balloons: [
            { x: 8, y: 8, w: 178, h: 76, tx: 222, ty: 124, lines: ["SAY- VAISHNAV- A", "CUSTOMER'S CARD WAS", "DECLINED! WE'RE", "RUINED!"] },
            { x: 14, y: 92, w: 70, h: 36, tx: 74, ty: 136, lines: ["RELAX,", "BOSS-"] },
        ],
    },
    {
        w: 300,
        alt: "Vaishnav raises a finger: \"The billing engine tries again tomorrow, then in three days, then next week.\" The boss: \"Like a debt collector?\" Vaishnav: \"A polite one.\"",
        layers: [room(300), boss(240, "doubt"), dev(88, "explain")[0], desk(12, 166), mug(132), duck(30, 199, 0.42), dev(88, "explain")[1]],
        balloons: [
            { x: 8, y: 8, w: 170, h: 74, tx: 112, ty: 132, lines: ["THE BILLING ENGINE", "TRIES AGAIN TOMORROW-", "THEN IN THREE DAYS-", "THEN NEXT WEEK-"] },
            { x: 192, y: 40, w: 100, h: 40, tx: 232, ty: 122, lines: ["LIKE A DEBT", "COLLECTOR?"] },
            { x: 10, y: 92, w: 68, h: 36, tx: 66, ty: 136, lines: ["A POLITE", "ONE."] },
        ],
    },
    {
        w: 300,
        alt: "The boss leaves beaming, cigar in mouth: \"Gosh! Thirty per cent fewer failed payments! I'm taking the afternoon off.\" Vaishnav waves.",
        layers: [room(300), boss(236, "happy"), dev(88, "wave")[0], desk(12, 166), laptop(112), duck(30, 199, 0.42), dev(88, "wave")[1]],
        balloons: [
            { x: 8, y: 8, w: 160, h: 62, tx: 214, ty: 124, lines: ["GOSH- THIRTY PER", "CENT FEWER FAILED", "PAYMENTS!"] },
            { x: 172, y: 70, w: 120, h: 38, tx: 238, ty: 124, lines: ["I'M TAKING THE", "AFTERNOON OFF-"] },
        ],
        credit: "Copr. 2026, Ghenge Features Syndicate",
    },
    {
        w: 400,
        alt: "Next morning. The boss storms in red-faced, waving a printout: \"Vaishnav!! The same customer got charged twice!!\" Vaishnav, sweating: \"...Twice?\"",
        layers: [room(400), door(296), boss(330, "paper"), dev(92, "shock")[0], desk(14, 172), laptop(116), duck(34, 199, 0.42), dev(92, "shock")[1]],
        balloons: [
            { x: 150, y: 10, w: 176, h: 62, tx: 312, ty: 122, lines: ["VAISHNAV!! THE SAME", "CUSTOMER GOT", "CHARGED TWICE!!"] },
            { x: 18, y: 88, w: 80, h: 28, tx: 84, ty: 134, lines: ["...TWICE?"] },
        ],
        caption: "NEXT MORNING-",
    },
    {
        w: 400,
        alt: "Vaishnav explains to the rubber duck, finger raised: \"So, duck: two workers grabbed the same retry at the same moment. A race condition!\" The duck says nothing.",
        layers: [room(400), dev(110, "explain")[0], desk(14, 386), duck(352, 145, 1.05, -1), dev(110, "explain")[1]],
        balloons: [
            { x: 8, y: 8, w: 196, h: 62, tx: 112, ty: 132, lines: ["SO, DUCK- TWO WORKERS", "GRABBED THE SAME RETRY", "AT THE SAME MOMENT-"] },
            { x: 214, y: 30, w: 96, h: 40, tx: 168, ty: 150, lines: ["A RACE", "CONDITION!"] },
            { x: 316, y: 108, w: 40, h: 24, tx: 306, ty: 148, lines: ["..."] },
        ],
    },
    {
        w: 400,
        alt: "The boss, hands on hips: \"Well? Did you fix it?\" Vaishnav, smug, a padlock on his screen: \"Added a lock. Now only one worker gets to be helpful at a time.\" The boss: \"I wish that worked on my meetings.\"",
        layers: [room(400), boss(318, "hips"), dev(92, "smug")[0], desk(14, 172), laptop(116, true), duck(34, 199, 0.42), dev(92, "smug")[1]],
        balloons: [
            { x: 184, y: 8, w: 120, h: 40, tx: 300, ty: 122, lines: ["WELL? DID YOU", "FIX IT?"] },
            { x: 8, y: 54, w: 172, h: 62, tx: 96, ty: 132, lines: ["ADDED A LOCK. NOW ONLY", "ONE WORKER GETS TO BE", "HELPFUL AT A TIME-"] },
            { x: 290, y: 54, w: 104, h: 56, tx: 326, ty: 122, lines: ["I WISH THAT", "WORKED ON MY", "MEETINGS-"] },
        ],
        signed: true,
    },
];

// ─── Printing ─────────────────────────────────────────────────────────────────

const LETTERING = { fontFamily: "var(--font-comic), 'Comic Sans MS', cursive", fontVariantLigatures: "none" };

function StripDefs() {
    return (
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
            <defs>
                {/* A slight wobble so the key plate reads as pen and ink. */}
                <filter id="strip-ink" x="-4%" y="-4%" width="108%" height="108%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                {/* Ben-Day dots: tints made from dots of one plate on bare paper. */}
                <pattern id="bd-skin" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="4" height="4" fill="#f7e8cf" />
                    <circle cx="2" cy="2" r="0.95" fill="#e07a5f" opacity="0.55" />
                </pattern>
                <pattern id="bd-angry" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="4" height="4" fill="#f3c9b0" />
                    <circle cx="2" cy="2" r="1.55" fill={RED} opacity="0.8" />
                </pattern>
                <pattern id="bd-teal" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                    <rect width="5" height="5" fill="#ecdcb2" />
                    <circle cx="2.5" cy="2.5" r="1.35" fill={TEAL} opacity="0.75" />
                </pattern>
                <pattern id="bd-floor" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="5" height="5" fill="#e8c88c" />
                    <circle cx="2.5" cy="2.5" r="1.2" fill={WOOD} opacity="0.6" />
                </pattern>
            </defs>
        </svg>
    );
}

function Plates({ layers }: { layers: Layer[] }) {
    return (
        <>
            {/* Colour plate, a touch out of register */}
            <g transform="translate(1.6 1)">
                {layers.map((layer, i) => (
                    <g key={i} transform={layer.t}>
                        {layer.shapes.map((s, j) =>
                            s.line || !s.fill || s.fill === INK ? null : <path key={j} d={s.d} fill={s.fill} />
                        )}
                    </g>
                ))}
            </g>

            {/* Key plate */}
            <g filter="url(#strip-ink)" style={{ mixBlendMode: "multiply" }} strokeLinecap="round" strokeLinejoin="round">
                {layers.map((layer, i) => (
                    <g key={i} transform={layer.t}>
                        {layer.shapes.map((s, j) =>
                            s.bg ? null : (
                                <path
                                    key={j}
                                    d={s.d}
                                    fill={s.line ? "none" : s.fill === INK ? INK : "#fff"}
                                    stroke={s.w === 0 ? "none" : INK}
                                    strokeWidth={s.w ?? 2}
                                />
                            )
                        )}
                    </g>
                ))}
            </g>
        </>
    );
}

function SpeechBalloon({ b }: { b: Balloon }) {
    const r = 10;
    const base = Math.min(Math.max(b.tx, b.x + r + 8), b.x + b.w - r - 8);
    const bottom = b.y + b.h;
    const d =
        `M${b.x + r} ${b.y} H${b.x + b.w - r} Q${b.x + b.w} ${b.y} ${b.x + b.w} ${b.y + r} ` +
        `V${bottom - r} Q${b.x + b.w} ${bottom} ${b.x + b.w - r} ${bottom} ` +
        `H${base + 7} L${b.tx} ${b.ty} L${base - 5} ${bottom} ` +
        `H${b.x + r} Q${b.x} ${bottom} ${b.x} ${bottom - r} V${b.y + r} Q${b.x} ${b.y} ${b.x + r} ${b.y} Z`;
    const top = b.y + (b.h - b.lines.length * 15) / 2 + 11.5;

    return (
        <g>
            <path d={d} fill="#fbf5e6" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
            {b.lines.map((line, i) => (
                <text key={i} x={b.x + b.w / 2} y={top + i * 15} textAnchor="middle" fontSize="13.5" fill={INK} style={LETTERING}>
                    {line}
                </text>
            ))}
        </g>
    );
}

function PanelArt({ panel, index }: { panel: Panel; index: number }) {
    const titleId = `strip-panel-${index}`;

    return (
        <svg viewBox={`0 0 ${panel.w} ${H}`} className="block h-full w-full" role="img" aria-labelledby={titleId}>
            <title id={titleId}>{`Panel ${index + 1}. ${panel.alt}`}</title>
            <Plates layers={panel.layers} />

            {panel.balloons.map((b, i) => <SpeechBalloon key={i} b={b} />)}

            {panel.caption && (
                <g>
                    <rect x="6" y="6" width="112" height="24" fill="#f7e7a6" stroke={INK} strokeWidth="1.8" />
                    <text x="14" y="23" fontSize="13" fill={INK} style={LETTERING}>{panel.caption}</text>
                </g>
            )}
            {panel.credit && (
                <text x="8" y={H - 8} fontSize="7" fill={INK} opacity="0.75" fontFamily="Georgia, serif">{panel.credit}</text>
            )}
            {panel.signed && (
                <text x={panel.w - 10} y={H - 10} textAnchor="end" fontSize="15" fill={INK} style={LETTERING} transform={`rotate(-4 ${panel.w - 10} ${H - 10})`}>
                    V. Ghenge
                </text>
            )}
        </svg>
    );
}

export default function ComicStrip() {
    return (
        <figure className="bg-[#efe2bf] p-2 [background-image:var(--grain)] sm:p-3">
            <StripDefs />
            <figcaption className="sr-only">Retry Logic, a comic strip by Vaishnav Ghenge.</figcaption>

            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
                {/* Title block, set in the first panel's slot as on a Sunday page */}
                <li aria-hidden="true" className="flex flex-col justify-between border-2 border-stone-900 bg-[#cf3b2b] p-4 text-stone-900 lg:col-span-3">
                    <div>
                        <p className="font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight xl:text-5xl">Retry<br />Logic-</p>
                        <p className="mt-3 font-serif text-sm font-black uppercase">by</p>
                        <p className="-mt-1 -rotate-3 text-4xl" style={LETTERING}>V. Ghenge</p>
                    </div>
                    <p className="mt-4 font-serif text-[9px] font-bold">Registered at the Pune Office</p>
                </li>

                {panels.map((panel, i) => (
                    <li key={i} className={`overflow-hidden border-2 border-stone-900 bg-[#f6ecd2] ${i < 3 ? "lg:col-span-3" : "lg:col-span-4"}`}>
                        <PanelArt panel={panel} index={i} />
                    </li>
                ))}
            </ol>
        </figure>
    );
}
