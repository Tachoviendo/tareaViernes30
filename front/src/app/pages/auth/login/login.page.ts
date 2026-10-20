import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Login } from '../../../model/usuario';
import { AuthService } from '../../../services/auth.service';
import { ErrorStore } from '../../../shared/services/error.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.page.css',
  templateUrl: './login.page.html',
})
export class LoginPage {
  readonly #authService = inject(AuthService);
  readonly #errorStore = inject(ErrorStore);
  readonly #router = inject(Router);

  readonly #loginModel = signal<Login>({
    username: '',
    password: '',
  });

  public readonly loginForm = form(this.#loginModel, (esquema) => {
    required(esquema.username, { message: 'El usuario es requerido' });
    required(esquema.password, { message: 'La contraseña es requerida' });
  });

  public async submitForm(event: Event) {
    event.preventDefault();
    if (!this.loginForm().valid()) {
      this.loginForm().markAsTouched();
      return;
    }
    try {
      const respuesta = await this.#authService.doLogin(this.loginForm().value());
      this.#authService.setToken(respuesta.token);
      const user = await this.#authService.fetchUser();
      this.#authService.setUser(user);
      this.#router.navigate(['/', 'home']);
    } catch (error: any) {
      this.#errorStore.addErrorFromError(error);
    }
  }
}
