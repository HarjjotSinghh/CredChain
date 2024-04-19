"use client";

import { Button } from "../button";
import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../input";

interface UpdatePasswordProps {
    redirectMethod: string;
}

export default function UpdatePassword({
    redirectMethod
}: UpdatePasswordProps) {
    const router = redirectMethod === "client" ? useRouter() : null;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await handleRequest(e, updatePassword, router);
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
                        <label htmlFor="password">New Password</label>
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
                        <label htmlFor="passwordConfirm">
                            Confirm New Password
                        </label>
                        <input
                            className={
                                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            }
                            id="passwordConfirm"
                            placeholder="Password"
                            type="password"
                            name="passwordConfirm"
                            autoComplete="current-password"
                        />
                    </div>
                    <Button variant="default" type="submit" className="mt-1">
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
