"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ReactPDF, {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Link as PDFLink,
    Image as PDFImage,
    Font,
    PDFDownloadLink,
    BlobProvider
} from "@react-pdf/renderer";
import { Button } from "../button";
import { Root, createRoot } from "react-dom/client";

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
    // Font.register({
    //     family: "WorkSans",
    //     src: "http://fonts.gstatic.com/s/worksans/v2/ElUAY9q6T0Ayx4zWzW63VKCWcynf_cDxXwCLxiixG1c.ttf",
    //     fontWeight: 800,
    //     fontStyle: "normal"
    // });
    const CertificatePDF = ({
        certificate
    }: {
        certificate: CertificateWithIssuingOrganization;
    }) => (
        <Document title={`${user.id}_${certificate.title}}`}>
            <Page
                style={{
                    flexDirection: "row",
                    backgroundColor: "#191a1a",
                }}
                size={{
                    width: 1920 / 3,
                    height: 1000 / 3
                }}
            >
                <View
                    style={{
                        margin: 24,
                        padding: 24,
                        flexGrow: 1
                    }}
                >
                    <PDFImage
                        src={"/logo.png"}
                        style={{
                            height: 40,
                            width: "auto",
                            objectFit: "contain"
                        }}
                    ></PDFImage>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 16,
                            fontSize: 12
                        }}
                    >
                        Certificate issued to
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 4,
                            fontSize: 20,
                            fontWeight: 800
                        }}
                    >
                        {user.id}
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 4,
                            fontSize: 12
                        }}
                    >
                        for
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 4,
                            fontSize: 24
                        }}
                    >
                        {certificate.title}
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 16,
                            fontSize: 12
                        }}
                    >
                        Issued By: {certificate.issuing_organization?.id}
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 4,
                            fontSize: 12
                        }}
                    >
                        Issued On:{" "}
                        {new Date(certificate.issue_date).toLocaleDateString()}
                    </Text>
                    <Text
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            marginTop: 4,
                            fontSize: 12
                        }}
                    >
                        Verfiication URL:{" "}
                        <PDFLink
                            style={{ color: "#0ee1be" }}
                            href={`https://explorer.aptoslabs.com/txn/${certificate.txn_id}?network=testnet`}
                        >
                            Click Here
                        </PDFLink>
                    </Text>
                </View>
            </Page>
        </Document>
    );
    const generateRandomColor = (hash: string) => {
        const color = "#" + hash.slice(0, 6);
        return color;
    };

    const viewCertificate = useRef<HTMLDivElement>(null);
    const [viewCertificateRoot, setViewCertificateRoot] = useState<Root | null>(
        null
    );

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
                                    <TableHead>Preview</TableHead>
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
                                        <TableCell>
                                            <Button
                                                variant={"secondary"}
                                                // onClick={() => {
                                                //     if (!viewCertificateRoot) {
                                                //         setViewCertificateRoot(
                                                //             createRoot(viewCertificate.current!)
                                                //         );
                                                //     }
                                                //     viewCertificateRoot?.render(
                                                //         <PDFViewer>
                                                //             <CertificatePDF
                                                //                 certificate={
                                                //                     certificate
                                                //                 }
                                                //             />
                                                //         </PDFViewer>
                                                //     );
                                                // }}
                                            >
                                                <BlobProvider
                                                    document={
                                                        <CertificatePDF
                                                            certificate={
                                                                certificate
                                                            }
                                                        />
                                                    }
                                                >
                                                    {({
                                                        blob,
                                                        url,
                                                        loading,
                                                        error
                                                    }) => {
                                                        console.log(blob);
                                                        console.log(url);
                                                        if (error) {
                                                            console.error(
                                                                error
                                                            );
                                                        }
                                                        return (
                                                            <Link href={url ?? "#"} type="download" target="_blank" rel={"noopener"}>
                                                                {loading
                                                                    ? "Loading..."
                                                                    : "Download"}
                                                            </Link>
                                                        );
                                                    }}
                                                </BlobProvider>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>You currently do not own any certificates.</p>
                    )}
                    <div
                        id="view-certificate"
                        ref={viewCertificate}
                        className="w-full [&_*]:w-full lg:h-[500px] lg:[&_*]:h-[500px] h-[300px] [&_*]:h-[300px]"
                    ></div>
                </div>
            )}
            {!connected && <NotConnected />}
        </div>
    );
};

export default CertifcatesOwned;
