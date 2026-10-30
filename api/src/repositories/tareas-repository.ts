import { myPool } from "../db/database.ts";
import { NotFoundError } from "../errors/response.errors.ts";
import type {
  ActualizarTareaType,
  CrearTareaType,
  Tarea,
  TareasQuery,
} from "../schemas/tareas.ts";

type TareasFiltros = Pick<TareasQuery, "estado" | "prioridad" | "grupo">;

// Solo se puede ordenar por estas columnas
const COLUMNAS_ORDEN:Record<TareasQuery["sort_by"], string> = {
  creada: "creada",
  prioridad: "prioridad",
  titulo: "titulo",
};
const DIRECCIONES_ORDEN: Record<TareasQuery["sort_dir"], string> = {
  asc: "ASC",
  desc: "DESC",
};

class TareasRepository {
  private readonly baseQuery = `
    SELECT * FROM tareas T
  `;

  // Junta los filtros que el usuario eligió (estado, prioridad, grupo)
  private armarWhere(filtros: TareasFiltros) {
    const condiciones: string[] = [];
    const valores: any[] = [];
    let idx = 1;

    if (filtros.estado !== undefined) {
      condiciones.push(`estado = $${idx++}`);
      valores.push(filtros.estado);
    }
    if (filtros.prioridad !== undefined) {
      condiciones.push(`prioridad = $${idx++}`);
      valores.push(filtros.prioridad);
    }
    if (filtros.grupo !== undefined) {
      condiciones.push(`grupo = $${idx++}`);
      valores.push(filtros.grupo);
    }

    const where =
      condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";
    return { where, valores, idx };
  }

  // Cuenta cuántas tareas hay en total con esos filtros
  async obtenerTotal(filtros: TareasFiltros): Promise<number> {
    const { where, valores } = this.armarWhere(filtros);
    const query = `
      SELECT COUNT(*) AS total FROM tareas T
      ${where};
    `;
    const result = await myPool.query(query, valores);
    return Number(result.rows[0].total);
  }

  // Trae las tareas de una sola página
  async obtenerPagina(query: TareasQuery): Promise<Tarea[]> {
    const { where, valores, idx } = this.armarWhere(query);
    const columna = COLUMNAS_ORDEN[query.sort_by] ?? "creada";
    const direccion = DIRECCIONES_ORDEN[query.sort_dir] ?? "ASC";
    // Cuántas tareas saltear para llegar a la página pedida
    const offset = (query.page - 1) * query.limit;

    const sql = `
      ${this.baseQuery}
      ${where}
      ORDER BY ${columna} ${direccion}, id_tarea ${direccion}
      LIMIT $${idx} OFFSET $${idx + 1};
    `;
    const result = await myPool.query(sql, [...valores, query.limit, offset]);
    return result.rows;
  }

  async obtenerTodas(): Promise<Tarea[]> {
    const query = `
      ${this.baseQuery}
      ORDER BY creada DESC;
    `;
    const result = await myPool.query(query);
    return result.rows;
  }

  async obtenerPorId(idTarea: number): Promise<Tarea> {
    const query = `
      ${this.baseQuery}
      WHERE id_tarea = $1;
    `;
    const result = await myPool.query(query, [idTarea]);
    if (result.rowCount !== 1) {
      throw new NotFoundError("Tarea no encontrada.");
    }
    return result.rows[0];
  }

  async crear(idCreador: number, dto: CrearTareaType): Promise<Tarea> {
    const query = `
      INSERT INTO tareas (id_creador, grupo, titulo, descripcion, prioridad)
      VALUES ($1, $2, $3, $4, COALESCE($5, '1:media'))
      RETURNING id_tarea;
    `;
    const result = await myPool.query(query, [
      idCreador,
      dto.grupo,
      dto.titulo,
      dto.descripcion ?? null,
      dto.prioridad,
    ]);

    return this.obtenerPorId(result.rows[0].id_tarea);
  }

  async actualizar(idTarea: number, dto: ActualizarTareaType): Promise<Tarea> {
    const campos: string[] = [];
    const valores: any[] = [];
    let idx = 1;

    if (dto.titulo !== undefined) {
      campos.push(`titulo = $${idx++}`);
      valores.push(dto.titulo);
    }
    if (dto.descripcion !== undefined) {
      campos.push(`descripcion = $${idx++}`);
      valores.push(dto.descripcion);
    }
    if (dto.grupo !== undefined) {
      campos.push(`grupo = $${idx++}`);
      valores.push(dto.grupo);
    }
    if (dto.prioridad !== undefined) {
      campos.push(`prioridad = $${idx++}`);
      valores.push(dto.prioridad);
    }

    if (campos.length === 0) {
      return this.obtenerPorId(idTarea);
    }

    valores.push(idTarea);
    const query = `
      UPDATE tareas
      SET ${campos.join(", ")}
      WHERE id_tarea = $${idx};
    `;

    await myPool.query(query, valores);
    return this.obtenerPorId(idTarea);
  }

  async finalizar(idTarea: number, fecha?: string): Promise<Tarea> {
    let terminadaValor = "CURRENT_TIMESTAMP";
    const params = [idTarea];
    if (fecha) {
      params.push();
      terminadaValor = "$2";
    }
    const query = `
      UPDATE tareas
      SET terminada = ${terminadaValor}
      WHERE id_tarea = $1 AND terminada IS NULL;
    `;

    await myPool.query(query, [idTarea, fecha]);
    return this.obtenerPorId(idTarea);
  }

  async eliminar(idTarea: number): Promise<void> {
    await this.obtenerPorId(idTarea);
    const query = `
      DELETE FROM tareas
      WHERE id_tarea = $1;
    `;
    await myPool.query(query, [idTarea]);
  }
}

export const tareasRepo = new TareasRepository();
