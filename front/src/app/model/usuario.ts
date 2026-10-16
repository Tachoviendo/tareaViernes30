export type Usuario = {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  grupos: string[];
  activo: boolean;
};

export type UsuarioLogueado = {
  id_usuario: number;
  username: string;
  grupos: string[];
};

export type Login = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
