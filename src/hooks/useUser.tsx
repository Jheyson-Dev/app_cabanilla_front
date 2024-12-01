import { getUserById, getUsers } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", `${id}`],
    queryFn: () => getUserById(id),
  });
};
