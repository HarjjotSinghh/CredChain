import Link from "next/link";

import Logo from "@/components/icons/Logo";
import GitHub from "@/components/icons/GitHub";

export default function Footer() {
    return (
        <footer className="mx-auto max-w-[1920px] lg:px-24 px-8 900 w-full">
            <div className="grid grid-cols-1  gap-8 py-12  transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 900">
                <div className="col-span-1 lg:col-span-3">
                    <div className="flex lg:items-start items-start flex-col gap-2">
                        <Link href="/">
                            <Logo className="lg:w-auto h-12 w-auto object-contain" />
                        </Link>
                        <p className="opacity-80 no-underline text-sm lg:max-w-none max-w-[350px]">
                            Our platform securely stores and verifies
                            credentials, creating an immutable and trustless
                            system that eliminates the risk of certificate
                            fraud.
                        </p>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-1">
                    <ul className="flex flex-col flex-initial md:flex-1">
                        <li className="py-3 md:py-0 md:pb-4">
                            <p className="font-bold  transition duration-150 ease-in-out hover:200">
                                ABOUT
                            </p>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                About
                            </Link>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                Careers
                            </Link>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <ul className="flex flex-col flex-initial md:flex-1">
                        <li className="py-3 md:py-0 md:pb-4">
                            <p className="font-bold  transition duration-150 ease-in-out hover:200">
                                LEGAL
                            </p>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="py-3 md:py-0 md:pb-4">
                            <Link
                                href="/"
                                className=" transition duration-150 ease-in-out hover:200"
                            >
                                Terms of Use
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-start col-span-1  lg:col-span-6 lg:justify-end">
                    <div className="flex items-center h-10 space-x-6">
                        <a
                            aria-label="Github Repository"
                            href="https://github.com/harjjotsinghh/CredChain"
                        >
                            <GitHub />
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row 900">
                <div>
                    <span>
                        &copy; {new Date().getFullYear()} CredChain, Inc. All
                        rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
