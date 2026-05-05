import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"
import HeroContent from "@/components/HeroContent";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400", "600", "700", "800"],
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
            <body className={`${inter.className} ${playfair.variable}`}>
                <SpeedInsights />
                <Analytics />
                <div className="mx-auto max-w-2xl px-6 py-16 lg:py-24">
                    <header className="mb-12">
                        <HeroContent />
                    </header>
                    <SectionNav />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
