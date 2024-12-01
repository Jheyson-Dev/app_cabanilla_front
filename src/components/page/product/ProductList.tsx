import { useAllProducts } from "@/hooks/useProduct";
import { ProductManagment } from "./ProductManagment";

export const ProductPage = () => {
  const { data } = useAllProducts();

  return <ProductManagment data={data || []} />;
};
