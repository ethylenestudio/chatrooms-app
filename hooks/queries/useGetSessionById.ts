import { useQuery } from "react-query";
import useAxios from "../useAxios";

export function useGetSessionById(id: string) {
  const { findSessionById } = useAxios();
  const { data: session, refetch } = useQuery(["findSession", id], () => findSessionById(id), {
    onSuccess: () => console.log("success"),
  });
  return { session, refetch };
}
