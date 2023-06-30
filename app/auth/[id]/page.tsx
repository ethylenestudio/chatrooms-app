"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { APIROOT, MESSAGE } from "@/config";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHydrated from "@/hooks/useHydrated";

const Auth = () => {
  const isHydrated = useHydrated();
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const router = useRouter();
  const key = pathname.slice(6);
  const [signature, setSignature] = useState<any>("");
  const { signMessageAsync } = useSignMessage({ message: MESSAGE });

  async function sign() {
    const sign = await signMessageAsync();

    setSignature(sign);
    try {
      const req = await axios.post(
        APIROOT + "/key/access",
        { key },
        { headers: { Authorization: sign as string } }
      );
      if (req.data) {
        router.push("/");
      }
    } catch (e: any) {
      console.log(e.response.data);
      if (e.response.data.statusCode == 400) {
        toast.error("QR is no longer valid!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
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
      {isConnected && (
        <button
          className="border-2 border-white p-4 rounded-lg"
          onClick={async () => {
            await sign();
          }}
        >
          Sign and Submit
        </button>
      )}
      {!isConnected && (
        <div>
          <ConnectButton showBalance={false} />
        </div>
      )}
    </div>
  );
};

export default Auth;
