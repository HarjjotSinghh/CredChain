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
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";

interface CertifcatesOwnedProps extends React.ComponentPropsWithRef<"div"> {
    user: Partial<Tables<"users">>;
}

const CertifcatesOwned = ({
    user,
    ...otherProps
}: CertifcatesOwnedProps & Record<string, any>) => {
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
    interface CertificateWithIssuingOrganization
        extends Tables<"certificates"> {
        issuing_organization?: Tables<"users">;
    }
    const [certificates, setCertificates] = React.useState<
        CertificateWithIssuingOrganization[] | null
    >(null);

    const generateRandomColor = (hash: string) => {
        const color = "#" + hash.slice(0, 6);
        return color;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user.id) {
                // Fetch certificates for the current user
                const { data: certificatesData, error: certificatesError } =
                    await supabase
                        .from("certificates")
                        .select(
                            `
                *,
                users (*)`
                        )
                        .filter("user_ids", "cs", `{"${user.id}"}`);

                if (certificatesError) {
                    console.error(
                        "Error fetching certificates:",
                        certificatesError.message
                    );
                    return;
                }

                setCertificates(
                    certificatesData as CertificateWithIssuingOrganization[]
                );

                // Fetch issuing organizations for the fetched certificates
                const issuingOrganizationIds = Array.from(
                    new Set(
                        certificatesData
                            .map(
                                (certificate) =>
                                    certificate.issuing_organization_id
                            )
                            .filter(Boolean)
                    )
                );
                if (issuingOrganizationIds.length > 0) {
                    const {
                        data: organizationsData,
                        error: organizationsError
                    } = await supabase
                        .from("users")
                        .select("*")
                        .in("id", issuingOrganizationIds);

                    if (organizationsError) {
                        console.error(
                            "Error fetching issuing organizations:",
                            organizationsError.message
                        );
                        return;
                    }

                    // Combine user data with certificates
                    const certificatesWithOrganizations = certificatesData.map(
                        (certificate) => ({
                            ...certificate,
                            issuing_organization: organizationsData.find(
                                (org) =>
                                    org.id ===
                                    certificate.issuing_organization_id
                            )
                        })
                    );

                    setCertificates(certificatesWithOrganizations);
                }
            }
        };

        fetchData();
    }, [user.id, supabase]);

    return (
        <div
            {...otherProps}
            className={cn(
                "flex justify-center items-center gap-8",
                otherProps.className
            )}
        >
            {connected && (
                <div className="flex lg:justify-center lg:items-center items-start justify-start flex-col gap-4 mt-4 w-full px-8">
                    <h1 className="font-heading text-3xl font-bold inline-flex items-start justify-start flex-col">
                        Certificates Owned
                    </h1>
                    {certificates && certificates.length > 0 ? (
                        <Table>
                            <TableHeader className="text-lg">
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Issued By</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Verification</TableHead>
                                    <TableHead>Badge</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-base divide-y divide-foreground/5">
                                {certificates.map((certificate) => (
                                    <TableRow key={certificate.id}>
                                        <TableCell>
                                            {certificate.title}
                                        </TableCell>
                                        <TableCell>
                                            {certificate.issuing_organization &&
                                                certificate.issuing_organization
                                                    .id}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                certificate.issue_date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={
                                                    certificate.txn_id
                                                        ? `https://explorer.aptoslabs.com/txn/${certificate.txn_id}?network=testnet`
                                                        : "#"
                                                }
                                                className="underline text-center w-full"
                                                target={
                                                    certificate.txn_id
                                                        ? "_blank"
                                                        : ""
                                                }
                                                rel="noopener, noreferrer"
                                            >
                                                {certificate.txn_id
                                                    ? "Visit Link"
                                                    : "Link Not Available"}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                style={{
                                                    background: `linear-gradient(45deg, ${generateRandomColor(certificate.certificate_hash)}, ${generateRandomColor(certificate.certificate_hash.split("").reverse().join(""))})`,
                                                    clipPath:
                                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                                    boxSizing: "content-box"
                                                }}
                                                className={`w-11 h-12 m-2 flex justify-center items-center hover:rotate-[360deg] transition-all duration-1000 ease-in-out hover:animate-pulse hover:scale-[1.2]`}
                                            >
                                                <span
                                                    className={`text-lg font-heading font-extrabold select-none`}
                                                >
                                                    {certificate.certificate_hash.at(
                                                        0
                                                    )}
                                                </span>
                                            </div>
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

export default CertifcatesOwned;
