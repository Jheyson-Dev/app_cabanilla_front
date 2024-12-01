import { ReturnManagement } from "./ReturnManagment";
import { useAllReturn } from "@/hooks/useReturn";

export const ReturnPage = () => {
  const { data } = useAllReturn();
  return <ReturnManagement data={data || []} />;
};
