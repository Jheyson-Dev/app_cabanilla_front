import { ExitManagement } from "./ExitManagment";
import { useAllExit } from "@/hooks/useExit";

export const ExitPage = () => {
  const { data } = useAllExit();
  return <ExitManagement data={data || []} />;
};
