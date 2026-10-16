import { Component, input, linkedSignal, OnInit, output } from '@angular/core';
import { form, FormField, maxLength, minLength, required, validate } from '@angular/forms/signals';
import { Usuario } from '../../model/usuario';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [FormField, JsonPipe],
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

    required(schemaPath.fecha_nacimiento, { message: 'La fecha de nacimiento es obligatoria' });
    validate(schemaPath.fecha_nacimiento, ({ value }) => {
      const fechaString = value();
      if (!fechaString) return null;

      const fecha = new Date(fechaString);
      fecha.setHours(0, 0, 0, 0);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const diferencia = hoy.getTime() - fecha.getTime();
      // Aproximación de 18 años en milisegundos
      const esMayor = diferencia >= 18 * 365.25 * 24 * 60 * 60 * 1000;
      if (!esMayor)
        return {
          kind: 'FechaIncorrecta',
          message: 'Debe ser Mayor de 18 años',
        };

      return null;
    });
  });

  public guardarUsuario = output<Usuario>();

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
    if (!this.usuarioForm().valid()) {
      this.usuarioForm().markAsTouched();
      return;
    }
    this.guardarUsuario.emit(this.usuarioForm().value());
  }
}
