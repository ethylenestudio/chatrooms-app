"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { connectorsForWallets, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { rainbowWallet, metaMaskWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public";

import merge from "lodash.merge";
import { PropsWithChildren } from "react";
import { WC_PROJECT_ID as projectId } from "@/config";

export const RainbowProvider = ({ children }: PropsWithChildren) => {
  const { chains, publicClient } = configureChains([mainnet, goerli], [publicProvider()])

  const connectors = connectorsForWallets([
    {
      groupName: 'Supported Wallets',
      wallets: [
        ...(typeof window !== "undefined" && (window as any)?.ethereum && [metaMaskWallet({ chains, projectId })] || []),
        rainbowWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    connectors
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={merge(
          darkTheme({
            accentColor: "#CBA1A4",
            accentColorForeground: "white",
            borderRadius: "large",
            overlayBlur: "small",
          }),
          { radii: { connectButton: "50px" } }
        )}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
