import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ErrorStore } from './shared/services/error.service';
import { AuthService } from './services/auth.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //NADA POR AQUI TODAVÍA
  public errorService = inject(ErrorStore);
  public authService = inject(AuthService);

  // Referencia al elemento <dialog> del template
  private errorDialog = viewChild<ElementRef<HTMLDialogElement>>('errordialog');

  constructor() {
    // El effect reacciona automáticamente cada vez que 'hayError' cambia
    effect(() => {
      const dialog = this.errorDialog()?.nativeElement;
      if (!dialog) return; // Aseguramos que la vista ya se renderizó

      if (this.errorService.hayError()) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }
}
