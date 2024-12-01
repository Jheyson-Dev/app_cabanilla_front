import { getReturns } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllReturn = () => {
  return useQuery({
    queryKey: ["returns"],
    queryFn: getReturns,
  });
};
