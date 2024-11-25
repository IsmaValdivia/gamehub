import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPlataformaPageRoutingModule } from './editar-plataforma-routing.module';

import { EditarPlataformaPage } from './editar-plataforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPlataformaPageRoutingModule
  ],
  declarations: [EditarPlataformaPage]
})
export class EditarPlataformaPageModule {}
