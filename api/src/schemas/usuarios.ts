import { Type, type Static } from "@fastify/type-provider-typebox";
import {
  MetadataSchema,
  PaginationSchema,
  SortDirSchema,
} from "./pagination.ts";

export const GrupoSchema = Type.Union([
  Type.Literal("user"),
  Type.Literal("admin"),
  Type.Literal("superadmin"),
]);

export const UsuarioSchema = Type.Object({
  id_usuario: Type.Integer(),
  username: Type.String({ minLength: 3, maxLength: 30 }),
  nombres: Type.String(),
  apellidos: Type.String(),
  fecha_nacimiento: Type.String({ format: "date" }),
  nombre_completo: Type.String(),
  grupos: Type.Array(Type.String(), { minItems: 1 }),
  activo: Type.Boolean(),
});

export const CrearUsuarioSchema = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 30 }),
  nombres: Type.String({ minLength: 1 }),
  apellidos: Type.String({ minLength: 1 }),
  fecha_nacimiento: Type.String({ format: "date" }),
  grupos: Type.Array(GrupoSchema, { minItems: 1 }),
  password: Type.String({ minLength: 6 }),
});

export const ActualizarUsuarioSchema = Type.Partial(
  Type.Object({
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date" }),
    grupos: Type.Array(GrupoSchema, { minItems: 1 }),
    activo: Type.Boolean(),
  }),
);

export const LoginSchema = Type.Object(
  {
    username: Type.String(),
    password: Type.String(),
  },
  {
    examples: [
      {
        username: "admin",
        password: "Contraseña1",
      },
      {
        username: "user",
        password: "Contraseña1",
      },
      {
        username: "superadmin",
        password: "Contraseña1",
      },
    ],
  },
);

/**
 * Esquema para usar en el payload al generar el token y también en request.user
 */
export const PayloadSchema = Type.Object({
  id_usuario: UsuarioSchema.properties.id_usuario,
  username: UsuarioSchema.properties.username,
  grupos: UsuarioSchema.properties.grupos,
});

export const UsuariosPaginados = Type.Object({
  data: Type.Array(UsuarioSchema),
  meta: MetadataSchema,
});

export const UsuariosQuerySchema = Type.Object({
  ...PaginationSchema.properties,
  sort_by: Type.Union(
    [
      Type.Literal("username"),
      Type.Literal("apellidos"),
      Type.Literal("fecha_nacimiento"),
    ],
    { default: "username", description: "Campo por el cual ordenar." },
  ),
  sort_dir: SortDirSchema,
  q: Type.Optional(
    Type.String({
      minLength: 1,
      description: "Busca en username y nombre completo.",
    }),
  ),
  activo: Type.Optional(
    Type.Boolean({ description: "Filtra por usuarios activos o inactivos." }),
  ),
});

export type Usuario = Static<typeof UsuarioSchema>;
export type UsuariosQuery = Static<typeof UsuariosQuerySchema>;
export type UsuariosPaginados = Static<typeof UsuariosPaginados>;
export type CrearUsuarioType = Static<typeof CrearUsuarioSchema>;
export type ActualizarUsuarioType = Static<typeof ActualizarUsuarioSchema>;
export type LoginType = Static<typeof LoginSchema>;
export type PayloadType = Static<typeof PayloadSchema>;
