import api from "@/config/config";
import { CreateEntry } from "@/types";

export const getEntries = async () => {
  try {
    const response = await api.get("/entry");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEntry = async (data: CreateEntry) => {
  try {
    const response = await api.post("entry", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
