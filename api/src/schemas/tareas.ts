import Type, { type Static } from "typebox";
import { GrupoSchema } from "./usuarios.ts";
import {
  MetadataSchema,
  PaginationSchema,
  SortDirSchema,
} from "./pagination.ts";

export const PrioridadSchema = Type.Union(
  [Type.Literal("0:baja"), Type.Literal("1:media"), Type.Literal("2:alta")],
  { default: "1:media" },
);
export const TareaSchema = Type.Object(
  {
    id_tarea: Type.Integer(),
    id_creador: Type.Integer(),
    grupo: GrupoSchema,
    titulo: Type.String({ minLength: 1, maxLength: 100 }),
    descripcion: Type.Union([Type.String(), Type.Null()]),
    prioridad: Type.Union([
      Type.Literal("0:baja"),
      Type.Literal("1:media"),
      Type.Literal("2:alta"),
    ]),
    creada: Type.String({ format: "date-time" }),
    terminada: Type.Optional(Type.String({ format: "date-time" })),
    estado: Type.Union([Type.Literal("Abierta"), Type.Literal("Cerrada")]),
  },
  { $id: "Tarea" },
);

export type Tarea = Static<typeof TareaSchema>;

export const TareasQuerySchema = Type.Object({
  ...PaginationSchema.properties,
  sort_by: Type.Union(
    [Type.Literal("creada"), Type.Literal("prioridad"), Type.Literal("titulo")],
    { default: "creada", description: "Campo por el cual ordenar." },
  ),
  sort_dir: SortDirSchema,
  estado: Type.Optional(TareaSchema.properties.estado),
  prioridad: Type.Optional(TareaSchema.properties.prioridad),
  grupo: Type.Optional(GrupoSchema),
});

export type TareasQuery = Static<typeof TareasQuerySchema>;

export const TareasPaginadas = Type.Object({
  data: Type.Array(TareaSchema),
  meta: MetadataSchema,
});

export type TareasPaginadas = Static<typeof TareasPaginadas>;

export const CrearTareaSchema = Type.Object({
  grupo: GrupoSchema,
  titulo: Type.String({ minLength: 1, maxLength: 100 }),
  descripcion: Type.String(),
  prioridad: PrioridadSchema,
});

export type CrearTareaType = Static<typeof CrearTareaSchema>;
export const ActualizarTareaSchema = Type.Partial(CrearTareaSchema);
export type ActualizarTareaType = Static<typeof ActualizarTareaSchema>;
