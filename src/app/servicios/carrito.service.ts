import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICarrito } from '../modelo/iCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ICarrito[] = [];
  private carritoSubject = new BehaviorSubject<ICarrito[]>([]);

  getCarrito() {
    return this.carritoSubject.asObservable();
  }

  agregarAlCarrito(producto: ICarrito) {
    const index = this.carrito.findIndex(item => item.id === producto.id);
    if (index > -1) {
      this.carrito[index].cantidad += 1;
    } else {
      this.carrito.push(producto);
    }
    this.carritoSubject.next(this.carrito);
  }

  actualizarCantidad(producto: ICarrito, cantidad: number) {
    const index = this.carrito.findIndex(item => item.id === producto.id);
    if (index > -1) {
      this.carrito[index].cantidad = cantidad;
      this.carritoSubject.next(this.carrito);
    }
  }

  eliminarDelCarrito(id: string) {
    this.carrito = this.carrito.filter(item => item.id !== id);
    this.carritoSubject.next(this.carrito);
  }

  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}
