import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarSucursalPageRoutingModule } from './agregar-sucursal-routing.module';

import { AgregarSucursalPage } from './agregar-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgregarSucursalPageRoutingModule
  ],
  declarations: [AgregarSucursalPage]
})
export class AgregarSucursalPageModule {}
