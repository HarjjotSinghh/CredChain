"use client";
import React from "react";
import { Tables } from "@/types_db";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { cn } from "@/utils/cn";
import NotConnected from "./NotConnected";

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
    return (
        <div {...otherProps} className={cn("flex justify-center items-center gap-8", otherProps.className)}>
            {connected && (<h1 className="font-heading text-3xl font-bold inline-flex items-start justify-start flex-col">Certificates Issued</h1>)}
            {!connected && (<NotConnected />)}
        </div>
    );
};

export default CertifcatesInfo;
