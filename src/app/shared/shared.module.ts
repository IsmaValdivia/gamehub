import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthFormComponent } from '../componentes/auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [AuthFormComponent]  // Exporta el componente para que otros módulos puedan usarlo
})
export class SharedModule { }
