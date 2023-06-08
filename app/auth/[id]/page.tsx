"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import { APIROOT, MESSAGE } from "@/config";
import axios from "axios";

const Auth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const key = pathname.slice(6);
  const [account, setAccount] = useState<any>();
  const [signature, setSignature] = useState<any>("");
  const MMSDK = new MetaMaskSDK({ dappMetadata: { name: "Chatrooms" } });
  const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

  async function connect() {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
      setAccount({ accounts });
    } else {
      alert("You dont have Metamask");
    }
  }

  async function signAndSend() {
    if (account?.accounts && ethereum) {
      const from = account.accounts[0];
      // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
      // This uses a Node.js-style buffer shim in the browser.
      const msg = `0x${Buffer.from(MESSAGE, "utf8").toString("hex")}`;
      const sign = await ethereum.request({
        method: "personal_sign",
        params: [msg, from],
      });
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
  }

  return (
    <div className="h-[80vh] flex justify-center items-center text-white">
      <button
        className="border-2 border-white p-4 rounded-md"
        onClick={async () => {
          if (!account) {
            await connect();
          } else {
            await signAndSend();
          }
        }}
      >
        {!account ? "Connect" : "Authenticate"}
      </button>
    </div>
  );
};

export default Auth;
