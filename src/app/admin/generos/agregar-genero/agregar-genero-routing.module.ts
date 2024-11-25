import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarGeneroPage } from './agregar-genero.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarGeneroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarGeneroPageRoutingModule {}
