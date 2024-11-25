import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGeneroPage } from './editar-genero.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGeneroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGeneroPageRoutingModule {}
