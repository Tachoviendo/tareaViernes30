import { HttpErrorResponse } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';

@Service()
export class ErrorStore {
  private _errors = signal<string[]>([]);

  public errors = this._errors.asReadonly();

  public hayError = computed(() => this._errors().length > 0);

  public addError(error: string): void {
    this._errors.update((current) => [...current, error]);
  }

  public addErrorFromError(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      //Error de HttpClient
      this.addError(error.error.message);
      return;
    }
    this.addError(error.message);
  }

  public clearErrors(): void {
    this._errors.set([]);
  }
}
