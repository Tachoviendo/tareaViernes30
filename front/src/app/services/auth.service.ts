import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse, Usuario, UsuarioLogueado } from '../model/usuario';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  readonly #baseUrl = environment.apiUrl + '/auth';
  readonly #httpClient = inject(HttpClient);
  readonly #token = signal<string | null>(null);
  readonly #user = signal<UsuarioLogueado | null>(null);
  readonly router = inject(Router);

  public readonly token = this.#token.asReadonly();
  public readonly user = this.#user.asReadonly();

  constructor() {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.#token.set(token);
      this.#user.set(JSON.parse(user));
    }
  }

  public setToken(token: string | null) {
    this.#token.set(token);
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  public setUser(usuario: UsuarioLogueado | null) {
    this.#user.set(usuario);
    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('user');
    }
  }

  public async doLogin(data: Login) {
    return firstValueFrom(this.#httpClient.post<LoginResponse>(this.#baseUrl + '/login', data));
  }

  public async doLogout() {
    this.setToken(null);
    this.setUser(null);
    this.router.navigate(['/login']); // Redirige a la pantalla de acceso
  }

  public async fetchUser() {
    return firstValueFrom(this.#httpClient.get<UsuarioLogueado>(this.#baseUrl));
  }
}
