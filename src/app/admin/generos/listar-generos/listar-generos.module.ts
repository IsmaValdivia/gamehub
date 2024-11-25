import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarGenerosPageRoutingModule } from './listar-generos-routing.module';

import { ListarGenerosPage } from './listar-generos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarGenerosPageRoutingModule
  ],
  declarations: [ListarGenerosPage]
})
export class ListarGenerosPageModule {}
