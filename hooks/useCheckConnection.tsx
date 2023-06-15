import { ORBIS } from "@/config";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const useCheckConnection = () => {
  const router = useRouter();
  const checkConnection = useCallback(async () => {
    let res = await ORBIS.isConnected();
    if (res.status != 200) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return checkConnection;
};

export default useCheckConnection;
