import { getProductById, getProducts } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", `${id}`],
    queryFn: () => getProductById(id),
  });
};
