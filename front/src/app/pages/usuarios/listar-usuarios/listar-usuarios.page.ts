import {
  Component,
  computed,
  effect,
  inject,
  resource,
  signal,
} from '@angular/core';
import type { Usuario, UsuariosParams } from '../../../model/usuario';
import type { Paginado } from '../../../model/paginado';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { DatePipe } from '@angular/common';

type OrdenUsuarios = NonNullable<UsuariosParams['sort_by']>;
type DireccionOrden = NonNullable<UsuariosParams['sort_dir']>;
@Component({
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.page.css',
  templateUrl: './listar-usuarios.page.html',
  imports: [DatePipe, RouterLink],
})
export class ListarUsuariosPage {
  private router = inject(Router);
  private usuarioService = inject(UsuariosService); //Inyección de dependencias.

  public readonly page = signal(1);
  public readonly limit = signal(10);
  public readonly busqueda = signal('');
  public readonly q = signal('');
  public readonly activo = signal<boolean | undefined>(undefined);
  public readonly sortBy = signal<OrdenUsuarios>('username');
  public readonly sortDir = signal<DireccionOrden>('asc');

  private readonly debounceBusqueda = effect((onCleanup) => {
    const busqueda = this.busqueda().trim();
    const timeoutId = setTimeout(() => {
      this.q.set(busqueda);
      this.page.set(1);
    }, 300);

    onCleanup(() => clearTimeout(timeoutId));
  });

  public usuariosResource = resource({
    defaultValue: {
      data: [],
      meta: { total: 0, page: 1, limit: 10, last_page: 0 },
    } satisfies Paginado<Usuario>,
    params: (): UsuariosParams => ({
      page: this.page(),
      limit: this.limit(),
      sort_by: this.sortBy(),
      sort_dir: this.sortDir(),
      q: this.q().trim() || undefined,
      activo: this.activo(),
    }),
    loader: ({ params }) => {
      return this.usuarioService.getAll(params);
    },
  });

  public usuarios = computed<Usuario[]>(() => this.usuariosResource.value().data);

  public totalUsuarios = computed(() => this.usuariosResource.value().meta.total);

  public readonly ultimaPagina = computed(() =>
    Math.max(1, this.usuariosResource.value().meta.last_page),
  );

  public cambiarBusqueda(value: string): void {
    this.busqueda.set(value);
  }

  public cambiarActivo(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.activo.set(value === '' ? undefined : value === 'true');
    this.page.set(1);
  }

  public cambiarOrden(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as OrdenUsuarios);
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
    if (!this.usuariosResource.isLoading() && this.page() > 1) {
      this.page.update((pagina) => pagina - 1);
    }
  }

  public paginaSiguiente(): void {
    if (!this.usuariosResource.isLoading() && this.page() < this.ultimaPagina()) {
      this.page.update((pagina) => pagina + 1);
    }
  }

  public goToCrear() {
    this.router.navigate(['/', 'usuarios', 'create']);
  }

  public async borrarUsuario(id_usuario: number) {
    await this.usuarioService.remove(id_usuario);

    const { total, limit, last_page, page } = this.usuariosResource.value().meta;
    const totalRestante = Math.max(0, total - 1);
    const paginaFinalRestante = Math.max(1, Math.ceil(totalRestante / limit));

    if (page === last_page && page > paginaFinalRestante) {
      this.page.set(paginaFinalRestante);
      return;
    }

    this.usuariosResource.reload();
  }
}

export default ListarUsuariosPage;
