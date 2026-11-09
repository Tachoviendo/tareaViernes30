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
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, personOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonBadge,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonText,
  IonButtons,
  IonFab,
  IonFabButton,
} from '@ionic/angular';
@Component({
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.page.css',
  templateUrl: './listar-usuarios.page.html',
  imports: [
    DatePipe,
    RouterLink,
    IonButton,
    IonBadge,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonText,
    IonButtons,
    IonFab,
    IonFabButton,
  ],
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

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, personOutline });
  }

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
