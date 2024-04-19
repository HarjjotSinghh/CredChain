"use client";

import { Button } from "../button";
import Link from "next/link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../input";

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
    allowEmail: boolean;
    redirectMethod: string;
}

export default function PasswordSignIn({
    allowEmail,
    redirectMethod
}: PasswordSignInProps) {
    const router = redirectMethod === "client" ? useRouter() : null;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await handleRequest(e, signInWithPassword, router);
        setIsSubmitting(false);
    };

    return (
        <div className="">
            <form
                noValidate={true}
                className="mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            className={
                                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            }
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className={
                                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            }
                            id="password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <Button variant="default" type="submit" className="mt-1">
                        Sign in
                    </Button>
                </div>
            </form>
            <p>
                <Link
                    href="/signin/forgot_password"
                    className="font-light text-sm"
                >
                    Forgot your password?
                </Link>
            </p>
            {allowEmail && (
                <p>
                    <Link
                        href="/signin/email_signin"
                        className="font-light text-sm"
                    >
                        Sign in via magic link
                    </Link>
                </p>
            )}
            <p>
                <Link href="/signin/signup" className="font-light text-sm">
                    Don't have an account? Sign up
                </Link>
            </p>
        </div>
    );
}
