"use client"
import AptosProvider from "@/utils/providers/aptosProvider";
import React from "react";

export default function AccountLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AptosProvider>{children}</AptosProvider>
        </>
    );
}
