import { Component, input, linkedSignal, OnInit, output } from '@angular/core';
import { form, FormField, maxLength, minLength, required, validate } from '@angular/forms/signals';
import { Usuario } from '../../model/usuario';

@Component({
  imports: [FormField],
  selector: 'app-usuario-form',
  styleUrl: './usuario.form.css',
  templateUrl: './usuario.form.html',
})
export class UsuarioForm {
  //Parámetro para <app-usuario-form>
  public usuario = input.required<Usuario>();

  //LinkedSignal para que su valor dependa de la otra señal, y a la vez sea editable
  public usuarioModel = linkedSignal<Usuario>(() => this.usuario());

  public usuarioForm = form(this.usuarioModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El username es obligatorio' });

    minLength(schemaPath.username, 2, {
      message: 'El largo mínimo para el usuario es 2 caracteres.',
    });
  });

  public guardarUsuario = output<Usuario>();
  // sdas;

  public onGrupoToggle(valor: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const gruposActuales = this.usuarioModel().grupos;

    const nuevosGrupos = isChecked
      ? [...gruposActuales, valor]
      : gruposActuales.filter((g) => g !== valor);

    this.usuarioForm.grupos().value.set(nuevosGrupos);
  }

  public submitForm(event: Event) {
    event.preventDefault();
    // if (!this.usuarioForm().valid()) {
    //   this.usuarioForm().markAsTouched();
    //   return;
    // }
    this.guardarUsuario.emit(this.usuarioForm().value());
  }
}
