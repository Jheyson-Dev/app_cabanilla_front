import { Entry } from "./entry";
import { Exit } from "./exit";
import { Loan } from "./loan";
import { Office } from "./office";
import { Return } from "./return";

export interface Product {
  id: string;
  name: string;
  description: string;
  OfficeProduct: OfficeProduct[];
  //   Opciones para tabla
  actions: any;
}

interface OfficeProduct {
  Entry: Entry[];
  Exit: Exit[];
  Loan: Loan[];
  Return: Return[];
  Office: Office;
  Product: Product;
}

export interface CreateProduct {
  name: string;
  description?: string;
}

export interface UpdateProduct {
  name: string;
  description?: string;
}
