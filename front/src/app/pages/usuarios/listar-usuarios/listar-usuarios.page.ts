import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  resource,
  viewChild,
} from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { Paginado } from '../../../model/paginado';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.page.css',
  templateUrl: './listar-usuarios.page.html',
  imports: [DatePipe, RouterLink],
})
export class ListarUsuariosPage implements OnInit {
  private router = inject(Router);
  private usuarioService = inject(UsuariosService); //Inyección de dependencias.

  public usuariosResource = resource({
    defaultValue: {
      data: [],
      meta: { total: 0, page: 1, limit: 10, last_page: 0 },
    } as Paginado<Usuario>,
    params: () => {
      return {};
    },
    loader: ({ params }) => {
      return this.usuarioService.getAll(params);
    },
  });

  public usuarios = computed<Usuario[]>(() => this.usuariosResource.value().data);

  public totalUsuarios = computed(() => this.usuariosResource.value().meta.total);

  public async ngOnInit(): Promise<void> {}

  public goToCrear() {
    this.router.navigate(['/', 'usuarios', 'create']);
  }

  public async borrarUsuario(id_usuario: number) {
    await this.usuarioService.remove(id_usuario);
    this.usuariosResource.reload();
  }
}

export default ListarUsuariosPage;
