import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Input() buttonText: string = 'Submit';  // Para manejar el texto del botón
  @Output() formSubmit = new EventEmitter<FormGroup>();  // Emitir el formulario al padre

  authForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.authForm.valid) {
      this.formSubmit.emit(this.authForm);  // Emitir el formulario válido
    }
  }
}
