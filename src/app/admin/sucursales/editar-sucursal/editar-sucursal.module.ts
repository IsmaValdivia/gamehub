import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarSucursalPageRoutingModule } from './editar-sucursal-routing.module';

import { EditarSucursalPage } from './editar-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarSucursalPageRoutingModule
  ],
  declarations: [EditarSucursalPage]
})
export class EditarSucursalPageModule {}
