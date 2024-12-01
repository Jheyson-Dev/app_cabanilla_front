import { getProfile } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (id: string = "") => {
  return useQuery({
    queryKey: ["user", `${id}`],
    queryFn: () => getProfile(id),
  });
};
