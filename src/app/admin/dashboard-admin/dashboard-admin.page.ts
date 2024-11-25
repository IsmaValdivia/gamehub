import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modelo/iProducto';
import { DesarrolladorService } from 'src/app/servicios/desarrollador.service';
import { ProductoService } from 'src/app/servicios/productos.service';
import { PublisherService } from 'src/app/servicios/publisher.service';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {
  totalProductos: number = 0;
  totalSucursales: number = 0;
  productosBajoStock: Producto[] = [];
  ofertasActivas: Producto[] = [];
  totalDesarrolladores: number = 0;
  totalPublishers: number = 0;

  constructor(
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private desarrolladorService: DesarrolladorService,
    private publisherService: PublisherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerTotalProductos();
    this.obtenerTotalSucursales();
    this.obtenerProductosBajoStock();
    this.obtenerOfertasActivas();
    this.obtenerTotalDesarroladores();
    this.obtenerTotalPublishers();
  }

  obtenerTotalProductos() {
    this.productoService.getProductos().subscribe((productos) => {
      this.totalProductos = productos.length;
    });
  }

  obtenerTotalSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales) => {
      this.totalSucursales = sucursales.length;
    });
  }

  obtenerProductosBajoStock() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productosBajoStock = productos.filter((producto) => producto.stock <= 5);
    });
  }

  obtenerOfertasActivas() {
    this.productoService.getProductos().subscribe((productos) => {
      this.ofertasActivas = productos.filter((producto) => producto.descuento && producto.descuento > 0);
    });
  }

  obtenerTotalDesarroladores() {
    this.desarrolladorService.getDesarrolladores().subscribe(total => {
      this.totalDesarrolladores = total;
    });
  }

  obtenerTotalPublishers(){
    this.publisherService.getPublishers().subscribe(total => {
      this.totalPublishers = total;
    });
  }


  irAdminJuegos(){
    this.router.navigate(['admin/productos/listar-producto'])
  }

  irAdminSucursal(){
    this.router.navigate(['admin/sucursales/listar-sucursal'])
  }

  irAdminOfertas() {
    this.router.navigate(['/admin/descuentos']);
  }

  irListarPlataformas() {
    this.router.navigate(['/admin/plataformas/listar-plataformas']);
  }

  irAdminGeneros(){
    this.router.navigate(['/admin/generos/listar-generos']);
  }
}
