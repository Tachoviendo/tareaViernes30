import Type, { type Static } from "typebox";

export const MetadataSchema = Type.Object({
  total: Type.Integer({
    description: "Total de registros en la base de datos",
  }),
  page: Type.Integer({ description: "Página actual" }),
  limit: Type.Integer({ description: "Cantidad de registros por página" }),
  last_page: Type.Integer({ description: "Última página disponible" }),
});

export const PaginationSchema = Type.Object({
  page: Type.Integer({
    minimum: 1,
    default: 1,
    description: "Número de página que quiero obtener del total.",
  }),
  limit: Type.Integer({
    minimum: 1,
    maximum: 100,
    default: 10,
    description: 'Cantidad de "filas" por página.',
  }),
});

export const SortDirSchema = Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
  default: "asc",
  description: "Dirección del ordenamiento.",
});

export type Pagination = Static<typeof PaginationSchema>;
export type SortDir = Static<typeof SortDirSchema>;
