export interface Office {
  id: string;
  name: string;
  location: string;

  //   Opciones de la Tabla
  actions: any;
}

export interface CreateOffice {
  name: string;
  location?: string;
}

export interface UpdateOffice {
  name: string;
  location?: string;
}
