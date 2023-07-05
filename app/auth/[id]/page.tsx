"use client";
import "@rainbow-me/rainbowkit/styles.css";

import useHydrated from "@/hooks/useHydrated";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { APIROOT, MESSAGE, ORBIS } from "@/config";
import axios from "axios";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ChangeWallet } from "@/components/ui/ChangeWallet";
import useOrbisUser from "@/hooks/store/useOrbisUser";


const showToast = (message: string, status: "error" | "info") => {
  if (status === "error") {
    return toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const Auth = () => {
  const isHydrated = useHydrated();
  const router = useRouter();
  const setUserDid = useOrbisUser((state) => state.setUserDid);

  const { id: key } = useParams();
  const account = useAccount();

  useEffect(() => {
    if (!account.isConnected) return
    if (!account.address) return

    (async () => {
      const res = await ORBIS.isConnected()
      if (res.status !== 200) return

      const address = res.did.split(":").pop()
      const currentWallet = account.address

      if (address.toLowerCase() === currentWallet.toLowerCase()) return

      showToast("New wallet detected. You will be prompted to log in again.", "info")
      await ORBIS.logout()
      setUserDid("")
    })()

  }, [account.isConnected])


  const { signMessageAsync } = useSignMessage({ message: MESSAGE });
  const [loading, setLoading] = useState(false);

  async function signAuthMessage() {
    setLoading(true);

    const signature = await signMessageAsync();

    try {
      const req = await axios.post(
        APIROOT + "/key/access",
        { key },
        { headers: { Authorization: signature as string } }
      );

      if (!req.data) return

      return router.push("/");
    } catch (e: any) {
      if (e.response.data.statusCode == 400) {
        showToast("QR is no longer valid, scan it again!", "error")
      }
    }

    setLoading(false);
  }

  if (!isHydrated) return null;
  return (
    <div className="flex h-[70%] w-[100vw] overflow-hidden justify-center items-center text-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {account.isConnected && (
        <div className="flex flex-col align-items center">
          <button
            className="border-2 border-white p-2 px-4 rounded-3xl mb-4"
            onClick={async () => {
              try {
                await signAuthMessage();
              } catch (e) {
                setLoading(false);
              }
            }}
          >
            {loading ? "Authenticating..." : "Sign and Join the room"}
          </button>
          {!loading && <ChangeWallet />}
        </div>
      )}
      {!account.isConnected && (
        <div>
          <ConnectButton showBalance={false} />
        </div>
      )}
    </div>
  );
};

export default Auth;
