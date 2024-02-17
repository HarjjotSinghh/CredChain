// AptosProvider.js
import React, { createContext, useState } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { WelldoneWallet } from "@welldone-studio/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const AptosProvider = ({ children }: { children: React.ReactNode }) => {
    const wallets = [new PetraWallet(), new WelldoneWallet()];
    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            onError={(error) => console.log("error", error)}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};

export default AptosProvider;
