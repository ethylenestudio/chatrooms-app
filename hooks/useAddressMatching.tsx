import { ORBIS } from "@/config";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const useAddressMatching = () => {
  const account = useAccount();

  async function checkConnections() {
    let res = await ORBIS.isConnected();
    return account.isConnected && res.status == 200;
  }
  async function checkMatching() {
    let res = await ORBIS.isConnected();
    if (await checkConnections()) {
      return (
        account.address?.toLowerCase() ==
        res.did.split(":")[res.did.split(":").length - 1].toLowerCase()
      );
    } else {
      return false;
    }
  }
  return checkMatching;
};

export default useAddressMatching;
