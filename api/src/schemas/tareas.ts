import Type, { type Static } from "typebox";
import { GrupoSchema } from "./usuarios.ts";

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

export const CrearTareaSchema = Type.Object({
  grupo: GrupoSchema,
  titulo: Type.String({ minLength: 1, maxLength: 100 }),
  descripcion: Type.String(),
  prioridad: PrioridadSchema,
});

export type CrearTareaType = Static<typeof CrearTareaSchema>;
export const ActualizarTareaSchema = Type.Partial(CrearTareaSchema);
export type ActualizarTareaType = Static<typeof ActualizarTareaSchema>;
