"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import Input from "../input";
import React, { use, useState } from "react";
import { Tables } from "@/types_db";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import NotConnected from "./NotConnected";
import { createClient } from "@/utils/supabase/client";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { sha256 } from "js-sha256";
import { InputTags } from "../multiple-inputs";

const certificateFormSchema = z.object({
    title: z
        .string()
        .min(10, { message: "Title must be at least 10 characters long" })
        .max(60, { message: "Title cannot be longer than 60 characters" }),
    certificate_hash: z.string(),
    metadata: z.object({}).nullable(),
    user_ids: z
        .array(
            z
                .string()
                .regex(
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                    { message: "Invalid UUID(s) entered" }
                )
        )
        .min(1, { message: "Please add at least one user" }),
    issuing_organization_id: z.string()
});

interface CreateCertificateProps extends React.ComponentPropsWithRef<"div"> {
    user: Partial<Tables<"users">>;
}

export default function CreateCertificate({
    user,
    ...otherProps
}: CreateCertificateProps & Record<string, any>) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof certificateFormSchema>>({
        resolver: zodResolver(certificateFormSchema),
        defaultValues: {
            title: "",
            certificate_hash: "",
            metadata: null,
            user_ids: [],
            issuing_organization_id: user.id
        }
    });
    function generateCertificate(
        values: z.infer<typeof certificateFormSchema>
    ) {
        return JSON.stringify(values);
    }
    const supabase = createClient();
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);

    const onSignAndSubmitTransaction = async (hashedCertificate: string) => {
        try {
            const response = await signAndSubmitTransaction({
                sender: account?.address,
                data: {
                    function:
                        "0x2554e56615b6ec17254f34e6e51ba1e6e52579437d9cc8eed61053b0dbabdf86::issue_certificate::issue_certificate",
                    functionArguments: [
                        `Hashed certificate: ${hashedCertificate}`
                    ]
                }
            });

            return await aptos
                .waitForTransaction({ transactionHash: response.hash })
                .then(() => {
                    return response;
                });
        } catch (error) {
            console.error("Error signing and submitting transaction:", error);
        }
    };

    async function onSubmit(values: z.infer<typeof certificateFormSchema>) {
        try {
            setLoading(true);
            const certificateData = generateCertificate(form.getValues());
            const certificateHash = sha256(certificateData);
            await onSignAndSubmitTransaction(certificateHash).then(
                async (txn) => {
                    const { error } = await supabase
                        .from("certificates")
                        .insert({
                            ...values,
                            certificate_hash: certificateHash,
                            txn_id: txn.hash
                        });
                    if (error) {
                        throw error;
                    }
                }
            );
        } catch (error) {
            console.error("Error submitting certificate form:", error);
        } finally {
            setLoading(false);
        }
    }

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

    return (
        <div
            className="lg:px-16 px-4 py-24 pb-48 flex justify-center items-center gap-16 max-w-2xl w-full"
            {...otherProps}
        >
            {connected && (
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="font-heading text-3xl font-bold inline-flex items-start justify-start flex-col">
                        Issue Certificates
                    </h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 rounded-2xl lg:p-8 p-4 border-2 border-primary/10 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-2xl shadow-primary/10 hover:shadow-primary/20 lg:min-w-[400px]"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="lg:text-lg text-base">
                                            Certificate Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Participated in XYZ"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="user_ids"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="lg:text-lg text-base">
                                            Certificants' CredChain IDs
                                        </FormLabel>
                                        <FormControl>
                                            <InputTags
                                                placeholder="User IDs"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                variant={"default"}
                                className="lg:text-lg font-heading font-semibold text-base py-6 w-full"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Handling Certificate Creation"
                                    : "Create Certificate"}
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
            {!connected && <NotConnected />}
        </div>
    );
}
