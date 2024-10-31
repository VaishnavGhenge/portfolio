import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Vaishnav Ghenge",
    description: "Portfolio site for Vaishnav Ghenge",
    generator: "Next.js",
    applicationName: "Vaishnav Ghenge",
    keywords: ["Vaishnav", "Ghenge", "TypeScript", "Python", "Noovosoft", "Developer", "WebRTC", "WebSocket", "Sinhgad",
        "Next.js", "React.js", "Django", "Flask", "Node.js"],
    authors: [{name: "Vaishnav", url: "www.vaishnavghenge.com"}],
    creator: "Vaishnav Ghenge",
    publisher: "Vaishnav Ghenge",
    icons: {
        icon: "/v.png"
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
        <body className={inter.className}>
        <SpeedInsights/>
        <div className='mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0'>
            <div className='lg:flex lg:justify-between lg:gap-4'>
                <header
                    className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24'>
                    <div className='mb-16'>
                        <h1 className='text-4xl font-bold tracking-tight'>
                            <a href='/'>Vaishnav Ghenge</a>
                        </h1>
                        <h2 className='mt-3 text-lg font-medium tracking-tight'>
                                    <span className='mr-1'>
                                        Application Developer at
                                    </span>
                            <a
                                href='https://www.noovosoft.com/'
                                target='_blank'
                                referrerPolicy='no-referrer'
                            >
                                Noovosoft
                            </a>
                        </h2>
                        <p className='mt-4 max-w-xs leading-normal'>
                            I build accessible, inclusive products and
                            digital experiences for the web.
                        </p>
                    </div>

                    <ul
                        className='ml-1 mt-8 flex items-center'
                        aria-label='Social media'
                    >
                        <li className='mr-5 text-xs'>
                            <a
                                className='block hover:text-slate-200'
                                href='https://github.com/VaishnavGhenge'
                                target='_blank'
                                rel='noreferrer noopener'
                                aria-label='GitHub (opens in a new tab)'
                            >
                                <span className='sr-only'>GitHub</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 16 16'
                                    fill='currentColor'
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                >
                                    <path
                                        d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
                                </svg>
                            </a>
                        </li>
                        <li className='mr-5 text-xs'>
                            <a
                                className='block hover:text-slate-200'
                                href='https://leetcode.com/vaishnavghenge/'
                                target='_blank'
                                rel='noreferrer noopener'
                                aria-label='Instagram (opens in a new tab)'
                            >
                                        <span className='sr-only'>
                                            Leetcode
                                        </span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                >
                                    <title>LeetCode icon</title>
                                    <path
                                        d='M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z'/>
                                </svg>
                            </a>
                        </li>
                        <li className='mr-5 text-xs'>
                            <a
                                className='block hover:text-slate-200'
                                href='https://twitter.com/VaishnavGhenge'
                                target='_blank'
                                rel='noreferrer noopener'
                                aria-label='Twitter (opens in a new tab)'
                            >
                                <span className='sr-only'>X</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1200 1227"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden="true"

                                >
                                    <path
                                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li className='mr-5 text-xs'>
                            <a
                                className='block hover:text-slate-200'
                                href='https://www.linkedin.com/in/vaishnavghenge/'
                                target='_blank'
                                rel='noreferrer noopener'
                                aria-label='LinkedIn (opens in a new tab)'
                            >
                                        <span className='sr-only'>
                                            LinkedIn
                                        </span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                >
                                    <path
                                        d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z'></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </header>
                <main className='pt-24 lg:w-1/2 lg:py-24'>
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}
