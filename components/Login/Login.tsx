/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRooms from "@/hooks/store/useRooms";
import useOrbisUser from "@/hooks/store/useOrbisUser";
import { ORBIS, ORBIS_PROJECT_ID } from "@/config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import logo from "@/public/assets/logo.png";
import Loader from "../ui/Loader";

const Login: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const setRooms = useRooms((state) => state.setRooms);
  const setUserDid = useOrbisUser((state) => state.setUserDid);
  useEffect(() => {
    async function update() {
      setLoading(true);
      let res = await ORBIS.isConnected();
      if (res.status == 200) {
        const { data: creds } = await ORBIS.getCredentials(res.did);
        const { data: contexts } = await ORBIS.getContexts(ORBIS_PROJECT_ID);
        const userContexts: any = [];
        for (const context of contexts) {
          for (const cred of creds) {
            if (
              cred.identifier == context.content.accessRules[0].requiredCredentials[0].identifier
            ) {
              userContexts.push(context);
            }
          }
        }
        setRooms(userContexts);
        setUserDid(res.did);
        router.push("/app");
        setLoading(false);
      }
      setLoading(false);
    }
    update();
  }, [setRooms, router, setUserDid]);

  async function connectToOrbis() {
    try {
      const provider = await account?.connector?.getProvider();
      if (!provider) {
        throw "Cannot fetch a provider";
      }
      setLoading(true);
      let res = await ORBIS.isConnected();
      if (res.status != 200) {
        res = await ORBIS.connect_v2({ lit: false, chain: "ethereum", provider: provider });
      }
      const { data: creds } = await ORBIS.getCredentials(res.did);
      const { data: contexts } = await ORBIS.getContexts(ORBIS_PROJECT_ID);
      const userContexts: any = [];
      for (const context of contexts) {
        for (const cred of creds) {
          if (cred.identifier == context.content.accessRules[0].requiredCredentials[0].identifier) {
            userContexts.push(context);
          }
        }
      }
      setRooms(userContexts);
      setUserDid(res.did);
      router.push("/app");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div className="text-white h-[100%] flex justify-center items-center flex-col space-y-6">
      <img src={logo.src} alt="logo" className="w-[120px]" />
      <p className="text-2xl text-center md:max-w-[400px] px-2">
        Welcome, start sharing your thoughts now!
      </p>
      {loading ? (
        <Loader width="40" height="40" />
      ) : account.isConnected ? (
        <button
          className="rounded-3xl bg-[#CBA1A4] border-white py-2 text-sm px-4"
          onClick={connectToOrbis}
        >
          Login to Orbis
        </button>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-center text-xs">To participate</p>
          <ConnectButton showBalance={false} />
        </div>
      )}
    </div>
  );
};

export default Login;
