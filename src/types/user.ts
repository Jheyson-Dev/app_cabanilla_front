export interface User {
  id: string;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  role: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Opciones para la tabla
  actions: any;
}

export interface CreateUser {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  role: string;
}

export interface UpdateUser {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  role: string;
}
