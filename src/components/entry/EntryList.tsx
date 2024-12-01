import { useAllEntry } from "@/hooks/useEntry";
import { EntryManagement } from "./EntryManagment";

export const EntryPage = () => {
  const { data } = useAllEntry();
  return <EntryManagement data={data || []} />;
};
