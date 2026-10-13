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
    defaultValue: [],
    params: () => {
      return {};
    },
    loader: ({ params }) => {
      return this.usuarioService.getAll();
    },
  });

  public usuarios = computed<Usuario[]>(() => this.usuariosResource.value());

  public totalUsuarios = computed(() => this.usuarios().length);

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
