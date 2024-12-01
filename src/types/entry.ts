import { Office } from "./office";
import { Product } from "./product";

export interface Entry {
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

export interface CreateEntry {
  officeId: string;
  productId: string;
  quantity: number;
}
