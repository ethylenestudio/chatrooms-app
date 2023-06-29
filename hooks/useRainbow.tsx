"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import merge from "lodash.merge";
import { connectorsForWallets, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { PropsWithChildren } from "react";
import { WC_PROJECT_ID } from "@/config";

const { chains, provider } = configureChains([mainnet], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains, projectId: WC_PROJECT_ID }),
      walletConnectWallet({
        chains,
        projectId: WC_PROJECT_ID,
        options: { projectId: WC_PROJECT_ID },
      }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const RainbowProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig client={wagmiClient}>
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
