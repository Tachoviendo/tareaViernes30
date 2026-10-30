import { inject, Service } from '@angular/core';
import { Usuario, UsuariosParams } from '../model/usuario';
import { Paginado } from '../model/paginado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class UsuariosService {
  private baseUrl = environment.apiUrl + '/usuarios';
  private _httpClient = inject(HttpClient);

  public async getAll(params: UsuariosParams = {}) {
    let httpParams = new HttpParams();
    // Agrega a la dirección solo los datos que tengan valor (página, orden, filtros)
    for (const [clave, valor] of Object.entries(params)) {
      if (valor !== undefined && valor !== null && valor !== '') {
        httpParams = httpParams.set(clave, String(valor));
      }
    }
    return firstValueFrom(
      this._httpClient.get<Paginado<Usuario>>(this.baseUrl, { params: httpParams }),
    );
  }

  public async getById(id: number) {
    return await firstValueFrom(this._httpClient.get<Usuario>(`${this.baseUrl}/${id}`));
  }

  public async add(nuevoUsuario: Usuario) {
    return firstValueFrom(this._httpClient.post<Usuario>(this.baseUrl, nuevoUsuario));
  }

  public async update(id: number, usuarioModificado: Usuario) {
    return firstValueFrom(
      this._httpClient.put<Usuario>(`${this.baseUrl}/${id}`, usuarioModificado),
    );
  }

  public async remove(id: number) {
    return firstValueFrom(this._httpClient.delete<Usuario>(`${this.baseUrl}/${id}`));
  }
}
