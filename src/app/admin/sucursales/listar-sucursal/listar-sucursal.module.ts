import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarSucursalPageRoutingModule } from './listar-sucursal-routing.module';

import { ListarSucursalPage } from './listar-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarSucursalPageRoutingModule
  ],
  declarations: [ListarSucursalPage]
})
export class ListarSucursalPageModule {}
