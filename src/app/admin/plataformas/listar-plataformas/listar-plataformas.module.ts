import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarPlataformasPageRoutingModule } from './listar-plataformas-routing.module';

import { ListarPlataformasPage } from './listar-plataformas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarPlataformasPageRoutingModule
  ],
  declarations: [ListarPlataformasPage]
})
export class ListarPlataformasPageModule {}
