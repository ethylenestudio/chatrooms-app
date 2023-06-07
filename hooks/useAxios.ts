import { APIROOT } from "@/config";
import { Session } from "@/dummy";
import Axios, { AxiosResponse } from "axios";
const axios = Axios.create({
  baseURL: APIROOT,
});
const useAxios = () => {
  const findSessionById = async (sessionId: string): Promise<AxiosResponse<Session>> => {
    const session = await axios.get("/session/findById", {
      params: { id: sessionId },
    });
    return session;
  };

  return {
    findSessionById,
  };
};

export default useAxios;
