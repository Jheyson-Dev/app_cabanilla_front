export interface Product {
  id: string;
  name: string;
  description: string;
  //   Opciones para tabla
  actions: any;
}

export interface CreateProduct {
  name: string;
  description?: string;
}

export interface UpdateProduct {
  name: string;
  description?: string;
}
