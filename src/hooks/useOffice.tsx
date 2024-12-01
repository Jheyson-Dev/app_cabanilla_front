import { getOfficeById, getOffices } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllOffices = () => {
  return useQuery({
    queryKey: ["offices"],
    queryFn: getOffices,
  });
};

export const useOfficeById = (id: string) => {
  return useQuery({
    queryKey: ["office", `${id}`],
    queryFn: () => getOfficeById(id),
  });
};
