import { Metadata } from "next/types";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { PropsWithChildren, Suspense } from "react";
import { getURL } from "@/utils/helpers";
import "styles/wallet-selector.css"
import "styles/main.css";

const meta = {
    title: "CredChain",
    description: "CredChain is a platform which allows users to validate their credentials and certificates using blockchain technology.",
    cardImage: "/logo.png",
    robots: "follow, index",
    favicon: "/favicon.ico",
    url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: meta.title,
        description: meta.description,
        referrer: "origin-when-cross-origin",
        keywords: ["CredChain", "Blockchain", "Web3", "Aptos", "Credentials"],
        authors: [{ name: "Harjot Singh", url: "https://harjot.pro/" }],
        creator: "Harjot Singh",
        publisher: "Harjot Singh",
        robots: meta.robots,
        icons: { icon: meta.favicon },
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
        }
    };
}

import { Instrument_Sans, Atkinson_Hyperlegible } from "next/font/google";
import { cn } from "@/utils/cn";

const instrument_sans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: 'swap',
    adjustFontFallback: false
});

const atkinson_hyperlegible = Atkinson_Hyperlegible({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-sans"
});

export default async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className={cn(instrument_sans.variable, atkinson_hyperlegible.variable, "dark")}>
            
            <body className={cn(`bg-background text-foreground font-sans antialiased`)}>

                <Navbar/>
                <main
                    id="skip"
                    className=""
                >
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
