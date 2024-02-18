"use client";
import React, { useEffect, useState } from "react";
import { Tables } from "@/types_db";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { cn } from "@/utils/cn";
import NotConnected from "./NotConnected";
import { createClient } from "@/utils/supabase/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../table";
import Link from "next/link";

interface CertifcatesInfoProps extends React.ComponentPropsWithRef<"div"> {
    user: Partial<Tables<"users">>;
}

const CertifcatesInfo = ({
    user,
    ...otherProps
}: CertifcatesInfoProps & Record<string, any>) => {
    const {
        connect,
        account,
        network,
        connected,
        disconnect,
        wallet,
        wallets,
        signAndSubmitTransaction,
        signTransaction,
        signMessage,
        signMessageAndVerify
    } = useWallet();
    const supabase = createClient();
    const [certificates, setCertificates] = React.useState<
        Tables<"certificates">[] | null
    >(null);

    React.useEffect(() => {
        // Fetch certificates for the current user
        const fetchCertificates = async () => {
            if (user.id) {
                const { data, error } = await supabase
                    .from("certificates")
                    .select("*")
                    .eq("issuing_organization_id", user.id);

                if (error) {
                    console.error(
                        "Error fetching certificates:",
                        error.message
                    );
                } else {
                    setCertificates(data);
                }
            }
        };

        fetchCertificates();
    }, [user.id, supabase]);
    return (
        <div
            {...otherProps}
            className={cn(
                "flex justify-center items-center gap-8 w-full",
                otherProps.className
            )}
        >
            {connected && (
                <div className="flex lg:justify-center lg:items-center items-start justify-start flex-col gap-4 w-full">
                    <h1 className="font-heading text-3xl font-bold inline-flex items-start justify-start flex-col">
                        Certificates Issued
                    </h1>
                    {certificates && certificates.length > 0 ? (
                        <Table className="w-full">
                            <TableHeader className="text-lg">
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Transaction URL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-base divide-y divide-foreground/5">
                                {certificates.map((certificate) => (
                                    <TableRow key={certificate.id}>
                                        <TableCell>
                                            {certificate.title}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                certificate.issue_date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={certificate.txn_id ? `https://explorer.aptoslabs.com/txn/${certificate.txn_id}?network=testnet` : "#"} className="underline" target={certificate.txn_id ? "_blank" : ""} rel="noopener, noreferrer">
                                                {certificate.txn_id ? "Visit Link" : "Link Not Available"}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No certificates found for the user.</p>
                    )}
                </div>
            )}
            {!connected && <NotConnected />}
        </div>
    );
};

export default CertifcatesInfo;
