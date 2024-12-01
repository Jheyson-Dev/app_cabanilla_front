import api from "@/config/config";
import { CreateProduct, UpdateProduct } from "@/types";

export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data: CreateProduct) => {
  try {
    const response = await api.post("/product", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const deleteProduct = async (id: string) => {};

export const updateProduct = async (id: string, data: UpdateProduct) => {
  try {
    const response = await api.patch(`/product/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
