"use client";

import Link from "next/link";
import { SignOut } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import Logo from "@/components/icons/Logo";
import { usePathname, useRouter } from "next/navigation";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import s from "./Navbar.module.css";
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";

interface NavlinksProps {
    user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
    const router = getRedirectMethod() === "client" ? useRouter() : null;
    return (
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center flex-1">
                <Link href="/" className={s.logo} aria-label="Logo">
                    <Logo className="h-12 w-auto object-contain" />
                </Link>
                <nav className="ml-8 text-xl md:flex hidden justify-center items-center gap-4 opacity-95">
                    <Link href="/account" className={s.link}>
                        <Button
                            variant={"link"}
                            className="px-0 py-0 mt-1 text-foreground"
                        >
                            {user && user.user_metadata.organization ? "Issue Certificates" : "View Certificates"}
                        </Button>
                    </Link>
                    {/* <Link href="/validate" className={s.link}>
                        <Button
                            variant={"link"}
                            className="px-0 py-0 mt-1 text-foreground"
                        >
                            Validate Certificates
                        </Button>
                    </Link> */}
                </nav>
            </div>
            <div className="flex justify-end space-x-8">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="scale-110 hover:cursor-pointer rounded-full border-2 border-primary/90">
                                <AvatarImage
                                    src={
                                        user.avatar_url ??
                                        "https://ui-avatars.com/api/?background=242428&color=fff&name=HS"
                                    }
                                    alt={user.full_name ?? "User name"}
                                />
                                <AvatarFallback>
                                    {user.full_name ?? "HS"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mr-8">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={"/account"}>
                                <DropdownMenuItem
                                >
                                    Account
                                </DropdownMenuItem>
                            </Link>
                            {user.user_metadata.organization && (
                                <Link
                                    className="hover:cursor-pointer"
                                    href={"/dashboard"}
                                >
                                    <DropdownMenuItem
                                    >
                                        Dashboard
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            <Link href={"/"}>
                                <DropdownMenuItem
                                >
                                    Home
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />

                            <form
                                onSubmit={(e) =>
                                    handleRequest(e, SignOut, router)
                                }
                            >
                                <DropdownMenuItem
                                    className="focus:bg-inherit"
                                >
                                    <Button
                                        className="ml-auto w-full hover:bg-primary/20"
                                        variant={"secondary"}
                                        type="submit"
                                    >
                                        Signout
                                    </Button>
                                </DropdownMenuItem>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex justify-center items-center flex-row gap-2">
                        <Link href="/signin" className={s.link}>
                            <Button
                                variant={"ghost"}
                                size={"default"}
                                className="font-[500] lg:px-6 px-4 border-2 border-primary"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signin/signup" className={s.link}>
                            <Button
                                variant={"default"}
                                size={"default"}
                                className="font-[500] lg:px-6 px-4 border-2 border-primary"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
