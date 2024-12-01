import { useAllOffices } from "@/hooks/useOffice";
import { OfficeManagment } from "./OfficeManagment";

export const OfficePage = () => {
  const { data } = useAllOffices();

  return <OfficeManagment data={data || []} />;
};
