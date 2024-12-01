import { getEntries } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllEntry = () => {
  return useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });
};
