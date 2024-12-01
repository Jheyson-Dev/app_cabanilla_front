import { Office } from "./office";
import { Product } from "./product";

export interface Exit {
  id: string;
  officeProductId: string;
  quantity: number;
  observation: string;
  createdAt: Date;
  OfficeProduct: OfficeProduct;
}

interface OfficeProduct {
  Office: Office;
  Product: Product;
}

export interface CreateExit {
  officeId: string;
  productId: string;
  quantity: number;
}
