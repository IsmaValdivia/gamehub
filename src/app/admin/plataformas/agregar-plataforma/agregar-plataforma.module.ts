import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPlataformaPageRoutingModule } from './agregar-plataforma-routing.module';

import { AgregarPlataformaPage } from './agregar-plataforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgregarPlataformaPageRoutingModule
  ],
  declarations: [AgregarPlataformaPage]
})
export class AgregarPlataformaPageModule {}
