import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import type { TareasPaginadas, TareasQueryParams } from '../model/tarea';

@Service()
export class TareasService {
  private baseUrl = environment.apiUrl + '/tareas';
  private _httpClient = inject(HttpClient);

  public async getAll(params: TareasQueryParams): Promise<TareasPaginadas> {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return firstValueFrom(
      this._httpClient.get<TareasPaginadas>(this.baseUrl, { params: httpParams }),
    );
  }
}
