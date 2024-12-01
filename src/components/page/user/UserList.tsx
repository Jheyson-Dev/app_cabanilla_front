import { useAllUser } from "@/hooks/useUser";
import { UserManagement } from "./UserManagment";

export const UserPage = () => {
  const { data } = useAllUser();

  return <UserManagement data={data || []} />;
};
