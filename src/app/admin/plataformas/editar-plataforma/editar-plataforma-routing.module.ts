import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPlataformaPage } from './editar-plataforma.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPlataformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPlataformaPageRoutingModule {}
