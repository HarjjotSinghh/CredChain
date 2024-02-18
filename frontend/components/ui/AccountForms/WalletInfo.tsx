"use client";
import React from "react";
import { Tables } from "@/types_db";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { cn } from "@/utils/cn";

interface WalletInfoProps extends React.ComponentPropsWithRef<"div"> {
    user: Partial<Tables<"users">>;
}

const WalletInfo = ({
    user,
    ...otherProps
}: WalletInfoProps & Record<string, any>) => {
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
        <div {...otherProps} className={cn("flex lg:justify-center lg:items-center justify-start items-start gap-8 px-8", otherProps.className)}>
            {connected && (<h1 className="font-heading text-xl font-bold inline-flex items-start justify-start flex-col">Account Connected via {wallet?.name} Wallet<span className="text-base font-medium">Click the button to disconnect</span></h1>)}
            <WalletSelector/>
        </div>
    );
};

export default WalletInfo;
