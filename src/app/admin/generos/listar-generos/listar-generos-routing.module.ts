import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarGenerosPage } from './listar-generos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarGenerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarGenerosPageRoutingModule {}
