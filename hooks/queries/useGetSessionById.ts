import { useQuery } from "react-query";
import useAxios from "../useAxios";

export function useGetSessionById(id: string, active: boolean) {
  const { findSessionById } = useAxios();
  const { data: session, refetch } = useQuery(
    ["findSession", id, active],
    () => findSessionById(id),
    {
      onSuccess: () => console.log("success"),
      enabled: active,
    }
  );
  return { session, refetch };
}
