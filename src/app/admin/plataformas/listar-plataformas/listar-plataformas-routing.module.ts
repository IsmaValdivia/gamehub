import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPlataformasPage } from './listar-plataformas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarPlataformasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarPlataformasPageRoutingModule {}
