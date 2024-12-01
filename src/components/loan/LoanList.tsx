import { LoanManagement } from "./LoanManagment";
import { useAllLoan } from "@/hooks/useLoan";

export const LoanPage = () => {
  const { data } = useAllLoan();
  return <LoanManagement data={data || []} />;
};
