"use client";

import { Button } from "../button";
import React from "react";
import Link from "next/link";
import { signUp } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../input";
import { Checkbox } from "../checkbox";
import { Label } from "../label";

// Define prop type with allowEmail boolean
interface SignUpProps {
    allowEmail: boolean;
    redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
    const router = redirectMethod === "client" ? useRouter() : null;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await handleRequest(e, signUp, router);
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
                        <div>
                            <label htmlFor="full_name">Full Name</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                id="full_name"
                                placeholder="Full Name"
                                type="text"
                                name="full_name"
                                autoCapitalize="none"
                                autoComplete="full_name"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="inline-flex flex-row-reverse gap-2 items-center mr-auto my-2">
                            <label htmlFor="organization">
                                Do you represent an organization?
                            </label>

                            <Checkbox
                                className="size-5"
                                id="organization"
                                name="organization"
                            ></Checkbox>
                        </div>
                    </div>
                    <Button variant="default" type="submit" className="mt-1">
                        Sign up
                    </Button>
                </div>
            </form>
            <p>Already have an account?</p>
            <p>
                <Link
                    href="/signin/password_signin"
                    className="font-light text-sm"
                >
                    Sign in with email and password
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
        </div>
    );
}
