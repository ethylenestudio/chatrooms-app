"use client";
import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { PropsWithChildren } from "react";
import { WC_PROJECT_ID } from "@/config";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Chatrooms",
  projectId: WC_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const RainbowProvider = ({ children }: PropsWithChildren) => {
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
