import { getLoans } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllLoan = () => {
  return useQuery({
    queryKey: ["loans"],
    queryFn: getLoans,
  });
};
