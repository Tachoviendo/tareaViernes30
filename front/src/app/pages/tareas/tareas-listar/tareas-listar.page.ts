import { DatePipe } from '@angular/common';
import { Component, computed, inject, resource, signal } from '@angular/core';
import type {
  EstadoTarea,
  GrupoTarea,
  PrioridadTarea,
  Tarea,
  TareasPaginadas,
  TareasQueryParams,
} from '../../../model/tarea';
import { TareasService } from '../../../services/tareas.service';

type OrdenTareas = NonNullable<TareasQueryParams['sort_by']>;
type DireccionOrden = NonNullable<TareasQueryParams['sort_dir']>;

@Component({
  imports: [DatePipe],
  selector: 'app-tareas-listar',
  styleUrl: './tareas-listar.page.css',
  templateUrl: './tareas-listar.page.html',
})
export class TareasListarPage {
  private readonly tareasService = inject(TareasService);

  public readonly page = signal(1);
  public readonly limit = signal(10);
  public readonly estado = signal<EstadoTarea | undefined>(undefined);
  public readonly prioridad = signal<PrioridadTarea | undefined>(undefined);
  public readonly grupo = signal<GrupoTarea | undefined>(undefined);
  public readonly sortBy = signal<OrdenTareas>('creada');
  public readonly sortDir = signal<DireccionOrden>('desc');

  public readonly tareasResource = resource({
    defaultValue: {
      data: [],
      meta: { total: 0, page: 1, limit: 10, last_page: 0 },
    } satisfies TareasPaginadas,
    params: (): TareasQueryParams => ({
      page: this.page(),
      limit: this.limit(),
      sort_by: this.sortBy(),
      sort_dir: this.sortDir(),
      estado: this.estado(),
      prioridad: this.prioridad(),
      grupo: this.grupo(),
    }),
    loader: ({ params }) => this.tareasService.getAll(params),
  });

  public readonly tareas = computed<Tarea[]>(() => this.tareasResource.value().data);
  public readonly totalTareas = computed(() => this.tareasResource.value().meta.total);
  public readonly ultimaPagina = computed(() =>
    Math.max(1, this.tareasResource.value().meta.last_page),
  );

  public cambiarEstado(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value ? (value as EstadoTarea) : undefined);
    this.page.set(1);
  }

  public cambiarPrioridad(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.prioridad.set(value ? (value as PrioridadTarea) : undefined);
    this.page.set(1);
  }

  public cambiarGrupo(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.grupo.set(value ? (value as GrupoTarea) : undefined);
    this.page.set(1);
  }

  public cambiarOrden(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as OrdenTareas);
    this.page.set(1);
  }

  public alternarDireccion(): void {
    this.sortDir.update((direccion) => (direccion === 'asc' ? 'desc' : 'asc'));
    this.page.set(1);
  }

  public cambiarLimite(event: Event): void {
    const nuevoLimite = Number((event.target as HTMLSelectElement).value);
    if (Number.isFinite(nuevoLimite) && nuevoLimite > 0) {
      this.limit.set(nuevoLimite);
      this.page.set(1);
    }
  }

  public paginaAnterior(): void {
    if (this.page() > 1) this.page.update((pagina) => pagina - 1);
  }

  public paginaSiguiente(): void {
    if (this.page() < this.ultimaPagina()) this.page.update((pagina) => pagina + 1);
  }
}

export default TareasListarPage;
