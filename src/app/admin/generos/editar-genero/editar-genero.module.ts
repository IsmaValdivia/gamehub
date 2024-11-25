import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGeneroPageRoutingModule } from './editar-genero-routing.module';

import { EditarGeneroPage } from './editar-genero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGeneroPageRoutingModule
  ],
  declarations: [EditarGeneroPage]
})
export class EditarGeneroPageModule {}
