import { Metadata } from "next/types";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { PropsWithChildren, Suspense } from "react";
import { getURL } from "@/utils/helpers";
import "styles/wallet-selector.css";
import "styles/main.css";

const meta = {
    title: "CredChain",
    description:
        "CredChain is a platform which allows users to validate their credentials and certificates using blockchain technology.",
    cardImage: "/cover-image.png",
    robots: "follow, index",
    favicon: "/favicon.ico",
    url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: meta.title,
        description: meta.description,
        referrer: "origin-when-cross-origin",
        keywords: [
            "CredChain",
            "Blockchain",
            "Web3",
            "Aptos",
            "Credentials",
            "Certificates",
            "Identity",
            "Verifiable Credentials",
            "Verifiable Certificates"
        ],
        authors: [{ name: "Harjot Singh", url: "https://harjot.pro/" }],
        creator: "Harjot Singh",
        publisher: "Harjot Singh",
        robots: meta.robots,
        icons: { icon: meta.favicon, apple: meta.favicon },
        metadataBase: new URL(meta.url),
        openGraph: {
            url: meta.url,
            title: meta.title,
            description: meta.description,
            images: [meta.cardImage],
            type: "website",
            siteName: meta.title
        },
        twitter: {
            card: "summary_large_image",
            site: "@HarjjotSinghh",
            creator: "@HarjjotSinghh",
            title: meta.title,
            description: meta.description,
            images: [meta.cardImage]
        },
        applicationName: meta.title
    };
}

import { Instrument_Sans, Atkinson_Hyperlegible } from "next/font/google";
import { cn } from "@/utils/cn";

const instrument_sans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
    adjustFontFallback: false
});

const atkinson_hyperlegible = Atkinson_Hyperlegible({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-sans"
});

export default async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html
            lang="en"
            className={cn(
                instrument_sans.variable,
                atkinson_hyperlegible.variable,
                "dark"
            )}
        >
            <meta property="og:title" content="CredChain" />
            <meta property="og:description" content="CredChain is a platform which allows users to validate their credentials and certificates using blockchain technology." />
            <meta
                property="og:url"
                content="https://credchain.vercel.app/"
            />
            <meta
                property="og:image"
                content="https://raw.githubusercontent.com/HarjjotSinghh/CredChain/master/frontend/public/cover-image.png"
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:site" content="CredChain" />
            <meta name="twitter:title" content="CredChain" />
            <meta name="twitter:description" content="CredChain is a platform which allows users to validate their credentials and certificates using blockchain technology." />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:image:src"
                content="https://raw.githubusercontent.com/HarjjotSinghh/CredChain/master/frontend/public/cover-image.png"
            />
            <meta name="theme-color" content="#1efefe" />
            <body
                className={cn(
                    `bg-background text-foreground font-sans antialiased`
                )}
            >
                <Navbar />
                <main id="skip" className="">
                    {children}
                </main>
                <Footer />
                <Suspense>
                    <Toaster />
                </Suspense>
            </body>
        </html>
    );
}
