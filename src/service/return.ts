import api from "@/config/config";
import { CreateReturn } from "@/types";

export const getReturns = async () => {
  try {
    const response = await api.get("/return");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReturn = async (data: CreateReturn) => {
  try {
    const response = await api.post("return", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
