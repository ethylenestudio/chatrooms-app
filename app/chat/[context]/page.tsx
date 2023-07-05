"use client";
import { Chat } from "@/components";
import { ORBIS } from "@/config";
import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";


export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try { await ORBIS.isConnected() } catch { }
      setLoading(false)
    })()
  }, [])


  const { context } = useParams()
  if (!context) {
    router.push("/")
    return <h1>Redirecting...</h1>
  }

  if(loading) return <h1>Loading chat...</h1>
  
  return <Chat context={context as string} className="col-span-2" />;
}
