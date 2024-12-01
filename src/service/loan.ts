import api from "@/config/config";
import { CreateLoan } from "@/types";

export const getLoans = async () => {
  try {
    const response = await api.get("/loan");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLoan = async (data: CreateLoan) => {
  try {
    const response = await api.post("loan", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
