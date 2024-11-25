import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeseadosPage } from './deseados.page';

const routes: Routes = [
  {
    path: '',
    component: DeseadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeseadosPageRoutingModule {}
