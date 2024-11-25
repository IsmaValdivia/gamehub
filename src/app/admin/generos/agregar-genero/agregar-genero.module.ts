import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarGeneroPageRoutingModule } from './agregar-genero-routing.module';

import { AgregarGeneroPage } from './agregar-genero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarGeneroPageRoutingModule
  ],
  declarations: [AgregarGeneroPage]
})
export class AgregarGeneroPageModule {}
