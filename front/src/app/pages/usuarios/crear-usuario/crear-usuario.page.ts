import { Component, inject } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { UsuarioForm } from '../../../components/usuario/usuario.form';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  imports: [UsuarioForm],
  selector: 'app-crear-usuario',
  styleUrl: './crear-usuario.page.css',
  templateUrl: './crear-usuario.page.html',
})
export class CrearUsuarioPage {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  public usuarioVacio: Usuario = {
    id_usuario: 0,
    nombres: 'valor inicial',
    apellidos: '',
    username: '',
    fecha_nacimiento: '',
    grupos: ['user'],
    activo: true,
  };

  public async onGuardarUsuario(usuario: Usuario) {
    await this.usuariosService.add(usuario);
    this.router.navigate(['/', 'usuarios']);
  }
}

export default CrearUsuarioPage;
