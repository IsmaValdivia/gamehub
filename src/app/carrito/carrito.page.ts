import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarrito } from 'src/app/modelo/iCarrito';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: ICarrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    // Obtener el carrito desde el servicio
    this.carritoService.getCarrito().subscribe((items) => {
      this.carrito = items;
    });
  }

  ajustarCantidad(item: ICarrito, incrementar: boolean) {
    if (incrementar) {
      this.carritoService.actualizarCantidad(item, item.cantidad + 1);
    } else if (item.cantidad > 1) {
      this.carritoService.actualizarCantidad(item, item.cantidad - 1);
    }
  }
  
  eliminarDelCarrito(id: string) {
    this.carritoService.eliminarDelCarrito(id);
  }
  
  calcularTotal() {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
  
  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  volverInicio() {
    this.router.navigate(['/tabs/tienda']);
  }
}
