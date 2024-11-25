import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeseadosPageRoutingModule } from './deseados-routing.module';

import { DeseadosPage } from './deseados.page';
import { HeaderModule } from 'src/app/componentes/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeseadosPageRoutingModule,
    HeaderModule
  ],
  declarations: [DeseadosPage]
})
export class DeseadosPageModule {}
