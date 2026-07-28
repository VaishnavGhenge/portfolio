import type { Metadata } from "next";
import { Newsreader, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"
import HeroContent from "@/components/HeroContent";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import DuckCompanion from "@/components/DuckCompanion";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400", "600", "700", "800"],
});

const newsreader = Newsreader({
    subsets: ["latin"],
    variable: "--font-newsreader",
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-plex-mono",
    weight: ["400", "500", "600"],
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
            <body className={`${newsreader.variable} ${playfair.variable} ${plexMono.variable} font-sans antialiased`}>
                <SpeedInsights />
                <Analytics />
                <div className="mx-auto max-w-2xl px-6 pb-16 pt-16 lg:pt-24">
                    <header className="mb-10">
                        <HeroContent />
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
