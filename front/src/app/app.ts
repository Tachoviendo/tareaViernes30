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
  IonItem,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, homeOutline, peopleOutline, checkboxOutline } from 'ionicons/icons';

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
    IonItem,
    IonIcon,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //NADA POR AQUI TODAVÍA
  public authService = inject(AuthService);

  constructor() {
    addIcons({ logOutOutline, homeOutline, peopleOutline, checkboxOutline });
  }

  public logout(): void {
    this.authService.doLogout();
  }
}
