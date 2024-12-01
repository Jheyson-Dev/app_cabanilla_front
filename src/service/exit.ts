import api from "@/config/config";
import { CreateExit } from "@/types";

export const getExits = async () => {
  try {
    const response = await api.get("/exit");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExit = async (data: CreateExit) => {
  try {
    const response = await api.post("/exit", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
