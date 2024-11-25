import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
    redirectTo: 
    'sesion/login', 
    pathMatch: 'full' 
  },
  { path: 'sesion/login', 
    loadChildren: () => import('./sesion/login/login.module').then(m => m.LoginPageModule) 
  },
  { path: 'sesion/register', 
    loadChildren: () => import('./sesion/registro/registro.module').then(m => m.RegistroPageModule) 
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'sesion/recover-pass',
    loadChildren: () => import('./sesion/recover-pass/recover-pass.module').then( m => m.RecoverPassPageModule)
  },
  {
    path: 'admin/productos/agregar-producto',
    loadChildren: () => import('./admin/productos/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'admin/productos/listar-producto',
    loadChildren: () => import('./admin/productos/listar-producto/listar-producto.module').then( m => m.ListarProductoPageModule)
  },
  {
    path: 'admin/productos/editar-producto/:id',
    loadChildren: () => import('./admin/productos/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'admin/sucursales/listar-sucursal',
    loadChildren: () => import('./admin/sucursales/listar-sucursal/listar-sucursal.module').then( m => m.ListarSucursalPageModule)
  },
  {
    path: 'admin/sucursales/agregar-sucursal',
    loadChildren: () => import('./admin/sucursales/agregar-sucursal/agregar-sucursal.module').then( m => m.AgregarSucursalPageModule)
  },
  {
    path: 'admin/sucursales/editar-sucursal/:id',
    loadChildren: () => import('./admin/sucursales/editar-sucursal/editar-sucursal.module').then( m => m.EditarSucursalPageModule)
  },
  {
    path: 'admin/dashboard-admin',
    loadChildren: () => import('./admin/dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },
  {
    path: 'admin/plataformas/listar-plataformas',
    loadChildren: () => import('./admin/plataformas/listar-plataformas/listar-plataformas.module').then( m => m.ListarPlataformasPageModule)
  },
  {
    path: 'admin/plataformas/agregar-plataforma',
    loadChildren: () => import('./admin/plataformas/agregar-plataforma/agregar-plataforma.module').then( m => m.AgregarPlataformaPageModule)
  },
  {
    path: 'admin/plataformas/editar-plataforma/:id',
    loadChildren: () => import('./admin/plataformas/editar-plataforma/editar-plataforma.module').then( m => m.EditarPlataformaPageModule)
  },
  {
    path: 'admin/generos/listar-generos',
    loadChildren: () => import('./admin/generos/listar-generos/listar-generos.module').then( m => m.ListarGenerosPageModule)
  },
  {
    path: 'admin/generos/agregar-genero',
    loadChildren: () => import('./admin/generos/agregar-genero/agregar-genero.module').then( m => m.AgregarGeneroPageModule)
  },
  {
    path: 'admin/generos/editar-genero/:id',
    loadChildren: () => import('./admin/generos/editar-genero/editar-genero.module').then( m => m.EditarGeneroPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'admin/descuentos',
    loadChildren: () => import('./admin/descuentos/descuentos.module').then( m => m.DescuentosPageModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
