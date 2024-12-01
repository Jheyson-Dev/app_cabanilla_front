import api from "@/config/config";
import { CreateUser, UpdateUser } from "@/types";

export const getUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (data: CreateUser) => {
  try {
    const response = await api.post("/user", data);
    return response.data;
  } catch (error) {}
};
export const updateUser = async (id: string, data: UpdateUser) => {
  try {
    const response = await api.patch(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};
