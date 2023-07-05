"use client";
import { Chat } from "@/components";
import { ORBIS } from "@/config";
import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";


export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)
  const [title, setTitle] = useState<string>("")
  const { context } = useParams()

  useEffect(() => {
    (async () => {
      try { await ORBIS.isConnected() } catch { }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if(!context) return

      const { data: info } = await ORBIS.getContext(context)
      if(info.content?.name) setTitle(info.content.name as string)
    })()
  }, [context])

  if (!context) {
    router.push("/")
    return <h1>Redirecting...</h1>
  }

  if (loading) return <h1>Loading chat...</h1>

  return <div className="col-span-2 flex flex-col">
    {title && <h1 className="text-center text-medium text-white pb-4">
      {title}
    </h1>}
    <Chat context={context as string} className="flex-1" />
  </div>

}
