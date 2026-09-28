import type { Metadata } from "next";
import { Newsreader, Playfair_Display, IBM_Plex_Mono, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import DuckCompanion from "@/components/DuckCompanion";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    // Variable font: one file covers every weight, including the 900 nameplate.
});

const newsreader = Newsreader({
    subsets: ["latin"],
    variable: "--font-newsreader",
    // Upright only: the italic file cost ~0.3 s of mobile LCP for two lines of text.
    style: ["normal"],
});

// Blackletter for the nameplate only, as on a broadsheet masthead.
const blackletter = UnifrakturMaguntia({
    subsets: ["latin"],
    variable: "--font-blackletter",
    weight: "400",
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-plex-mono",
    weight: ["400", "500"],
});

export const metadata: Metadata = {
    title: "Vaishnav Ghenge - Software Developer",
    description: "Software Developer at Noovosoft Technologies. Crafting innovative, high-performance applications using TypeScript, Python, Next.js, Django, WebRTC, and modern web technologies.",
    generator: "Next.js",
    applicationName: "Vaishnav Ghenge",
    keywords: ["Vaishnav", "Ghenge", "TypeScript", "Python", "Noovosoft", "Developer", "WebRTC", "WebSocket",
        "Next.js", "React.js", "Django", "Flask", "Node.js", "Software Engineer", "Full Stack Developer"],
    authors: [{ name: "Vaishnav Ghenge", url: "https://www.vaishnavghenge.com" }],
    creator: "Vaishnav Ghenge",
    publisher: "Vaishnav Ghenge",
    icons: { icon: "/v.png" },
    openGraph: {
        title: "Vaishnav Ghenge - Software Developer",
        description: "Software Developer at Noovosoft Technologies.",
        url: "https://www.vaishnavghenge.com",
        siteName: "Vaishnav Ghenge",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vaishnav Ghenge - Software Developer",
        description: "Software Developer at Noovosoft Technologies.",
        creator: "@VaishnavGhenge",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${newsreader.variable} ${playfair.variable} ${plexMono.variable} ${blackletter.variable} font-sans antialiased`}>
                <SpeedInsights />
                <Analytics />
                <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:pt-12">
                    <header>
                        <Masthead />
                    </header>
                    <SectionNav />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
                <DuckCompanion />
            </body>
        </html>
    );
}
