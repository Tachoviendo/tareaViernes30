import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse, Usuario, UsuarioLogueado } from '../model/usuario';
import { firstValueFrom } from 'rxjs';

@Service()
export class AuthService {
  readonly #baseUrl = environment.apiUrl + '/auth';
  readonly #httpClient = inject(HttpClient);
  readonly #token = signal<string | null>(null);
  readonly #user = signal<UsuarioLogueado | null>(null);

  public readonly token = this.#token.asReadonly();
  public readonly user = this.#user.asReadonly();

  public setToken(token: string | null) {
    this.#token.set(token);
  }

  public setUser(usuario: UsuarioLogueado | null) {
    this.#user.set(usuario);
  }

  public async doLogin(data: Login) {
    return firstValueFrom(this.#httpClient.post<LoginResponse>(this.#baseUrl + '/login', data));
  }

  public async fetchUser() {
    return firstValueFrom(this.#httpClient.get<UsuarioLogueado>(this.#baseUrl));
  }
}
