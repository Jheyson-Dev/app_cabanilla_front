import api from "@/config/config";
import { LoginInput } from "@/types";

export const login = async (data: LoginInput) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (id: string) => {
  try {
    const response = await api.get(`/auth/profile/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
