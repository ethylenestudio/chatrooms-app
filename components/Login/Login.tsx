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
import useAddressMatching from "@/hooks/useAddressMatching";
import useHydrated from "@/hooks/useHydrated";

type MinimalCredential = {
  identifier: string;
};

type CredentialRule = {
  type: "credential";
  requiredCredentials: Array<MinimalCredential>;
};

const hasCredential = (
  targetCredential: MinimalCredential,
  userCredentials: Array<MinimalCredential>
) => {
  return userCredentials.some(
    (credential) => credential.identifier === targetCredential.identifier
  );
};

const checkCredentialRule = (rule: CredentialRule, userCredentials: Array<MinimalCredential>) => {
  for (const credential of rule.requiredCredentials) {
    if (hasCredential(credential, userCredentials)) return true;
  }

  return false;
};

const hasContextAccess = (context: any, userCredentials: Array<MinimalCredential>) => {
  if (!context.content.accessRules || context.content.accessRules.length === 0) {
    return true;
  }

  for (const rule of context.content.accessRules) {
    // Check Credential rules only, for now
    if (rule.type !== "credential") continue;
    if (checkCredentialRule(rule, userCredentials)) return true;
  }

  return false;
};

const isAlreadyConnected = async (): Promise<{ did?: string }> => {
  try {
    const res = await ORBIS.isConnected();
    if (res.status !== 200) return {};

    return {
      did: res.did,
    };
  } catch (e) {
    console.log(e);
    return {};
  }
};

const Login: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isConnected, connector } = useAccount();
  const checkMatching = useAddressMatching();
  const isHydrated = useHydrated();
  const setRooms = useRooms((state) => state.setRooms);
  const setUserDid = useOrbisUser((state) => state.setUserDid);
  async function logoutOnNotMatch() {
    const res = await ORBIS.isConnected();
    if (isConnected && res.status == 200) {
      const status = await checkMatching();
      if (!status) {
        await ORBIS.logout();
      }
    }
  }
  const authenticateOrbis = async () => {
    try {
      const provider = await connector?.getProvider();
      if (!provider) {
        throw "Cannot fetch a provider";
      }

      const { status, did } = await ORBIS.connect_v2({
        lit: false,
        chain: "ethereum",
        provider: provider,
      });
      if (status !== 200 || !did) {
        return {};
      }

      return { did };
    } catch (e) {
      console.log("Connection error", e);
      return {};
    }
  };

  const updateRoomAccess = async (did: string) => {
    const { data: userCredentials } = await ORBIS.getCredentials(did);
    const { data: contexts } = await ORBIS.getContexts(ORBIS_PROJECT_ID);
    const userContexts: any = [];
    for (const context of contexts) {
      if (!hasContextAccess(context, userCredentials)) continue;
      userContexts.push(context);
    }
    setRooms(userContexts);
  };

  useEffect(() => {
    async function update() {
      setLoading(true);
      await logoutOnNotMatch();
      const { did } = await isAlreadyConnected();
      if (!did || !isConnected) {
        setLoading(false);
      }
      if (!did && isConnected) {
        const { did: localSession } = await isAlreadyConnected();
        if (localSession) {
          setLoading(true);
          setUserDid(localSession);
          await updateRoomAccess(localSession);
          router.push("/app");
          return setLoading(false);
        }
        return setLoading(false);
      }
      if (did && isConnected) {
        setLoading(true);
        await updateRoomAccess(did);
        router.push("/app");
        setLoading(false);
      }
    }
    update();
  }, [setRooms, router, setUserDid, isConnected]);

  async function connectToOrbis() {
    try {
      const { did: localSession } = await isAlreadyConnected();
      if (localSession) {
        setUserDid(localSession);
        await updateRoomAccess(localSession);
        router.push("/app");
        return setLoading(false);
      }

      const { did } = await authenticateOrbis();
      setUserDid(did);

      if (!did) {
        return setLoading(false);
      }
      await updateRoomAccess(did);

      router.push("/app");
    } catch (e) {
      setLoading(false);
    }
  }

  if (!isHydrated) return null;
  return (
    <div className="text-white h-[100%] flex justify-center items-center flex-col space-y-6">
      <img src={logo.src} alt="logo" className="w-[120px]" />
      <p className="text-2xl text-center md:max-w-[400px] px-2">
        Welcome, start sharing your thoughts now!
      </p>
      {loading ? (
        <Loader width="40" height="40" />
      ) : isConnected ? (
        <button
          className="rounded-3xl bg-[#CBA1A4] border-white py-2 text-sm px-4"
          onClick={() => {
            setLoading(true);
            connectToOrbis();
          }}
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
