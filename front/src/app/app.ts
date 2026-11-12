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
  IonToast,
  IonButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  homeOutline,
  peopleOutline,
  checkboxOutline,
  imageOutline,
} from 'ionicons/icons';
import { NotificationService } from './services/notification.service';

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
    IonToast,
    IonButton,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //NADA POR AQUI TODAVÍA
  public authService = inject(AuthService);
  public notificationService = inject(NotificationService);

  constructor() {
    addIcons({ logOutOutline, imageOutline, homeOutline, peopleOutline, checkboxOutline });
  }

  public logout(): void {
    this.authService.doLogout();
  }
}
