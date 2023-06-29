"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MetaMaskSDK from "@metamask/sdk";
import { APIROOT, MESSAGE } from "@/config";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";

const Auth = () => {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const router = useRouter();
  const key = pathname.slice(6);
  const [signature, setSignature] = useState<any>("");
  const { signMessageAsync } = useSignMessage({ message: MESSAGE });

  async function sign() {
    const sign = await signMessageAsync();

    setSignature(sign);
    const req = await axios.post(
      APIROOT + "/key/access",
      { key },
      { headers: { Authorization: sign as string } }
    );
    if (req.data) {
      router.push("/");
    }
  }

  return (
    <div className="flex h-[70%] w-[100vw] overflow-hidden justify-center items-center text-white">
      {isConnected ? (
        <button
          className="border-2 border-white p-4 rounded-md"
          onClick={async () => {
            await sign();
          }}
        >
          Sign and Submit
        </button>
      ) : (
        <div>
          <ConnectButton showBalance={false} />
        </div>
      )}
    </div>
  );
};

export default Auth;
