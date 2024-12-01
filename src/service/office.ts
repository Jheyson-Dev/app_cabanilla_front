import api from "@/config/config";
import { CreateOffice, UpdateOffice } from "@/types";

export const getOffices = async () => {
  try {
    const response = await api.get("/office");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOfficeById = async (id: string) => {
  try {
    const response = await api.get(`/office/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createOffice = async (data: CreateOffice) => {
  try {
    const response = await api.post("/office", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateOffice = async (id: string, data: UpdateOffice) => {
  try {
    const response = await api.patch(`/office/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
