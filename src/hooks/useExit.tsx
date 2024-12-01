import { getExits } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllExit = () => {
  return useQuery({
    queryKey: ["exits"],
    queryFn: getExits,
  });
};
