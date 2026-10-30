export type GrupoTarea = 'user' | 'admin' | 'superadmin';

export type PrioridadTarea = '0:baja' | '1:media' | '2:alta';

export type EstadoTarea = 'Abierta' | 'Cerrada';

export type Tarea = {
  id_tarea: number;
  id_creador: number;
  grupo: GrupoTarea;
  titulo: string;
  descripcion: string | null;
  prioridad: PrioridadTarea;
  creada: string;
  terminada?: string;
  estado: EstadoTarea;
};

export type TareasQueryParams = {
  page?: number;
  limit?: number;
  sort_by?: 'creada' | 'prioridad' | 'titulo';
  sort_dir?: 'asc' | 'desc';
  estado?: EstadoTarea;
  prioridad?: PrioridadTarea;
  grupo?: GrupoTarea;
};

export type TareasPaginadas = {
  data: Tarea[];
  meta: {
    total: number;
    page: number;
    limit: number;
    last_page: number;
  };
};
