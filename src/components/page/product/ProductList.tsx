import { useAllProducts } from "@/hooks/useProduct";
import { ProductManagment } from "./ProductManagment";

export const ProductPage = () => {
  const { data } = useAllProducts();

  console.log(data);

  return <ProductManagment data={data || []} />;
};
