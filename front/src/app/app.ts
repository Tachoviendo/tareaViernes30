import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import {
  IonApp,
  IonRouterOutlet,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonList,
  IonLabel,
  IonMenuToggle,
} from '@ionic/angular';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonRouterOutlet,
    IonFooter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonList,
    IonLabel,
    IonMenuToggle,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //NADA POR AQUI TODAVÍA
  public authService = inject(AuthService);
}
