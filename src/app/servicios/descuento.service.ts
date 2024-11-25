import { Injectable } from '@angular/core';
import { ProductoService } from './productos.service';
import { map, Observable } from 'rxjs';
import { Producto } from '../modelo/iProducto';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  constructor(private productoService: ProductoService) {}

  aplicarDescuentoPorPlataforma(plataforma: string, descuento: number): Observable<Producto[]> {
    return this.productoService.getProductos().pipe(
      map(productos => {
        const productosFiltrados = productos.filter(producto => producto.plataforma === plataforma);
        productosFiltrados.forEach(producto => {
          producto.descuento = descuento;
          this.productoService.editarProducto(producto.id!, producto); // Actualizar en Firebase
        });
        return productosFiltrados;
      })
    );
  }

  aplicarDescuentoPorGenero(genero: string, descuento: number): Observable<Producto[]> {
    return this.productoService.getProductos().pipe(
      map(productos => {
        const productosFiltrados = productos.filter(producto => producto.genero.includes(genero));
        productosFiltrados.forEach(producto => {
          producto.descuento = descuento;
          this.productoService.editarProducto(producto.id!, producto); // Actualizar en Firebase
        });
        return productosFiltrados;
      })
    );
  }

  aplicarDescuentoPorDesarrollador(desarrollador: string, descuento: number): Observable<Producto[]> {
    return this.productoService.getProductos().pipe(
      map(productos => {
        const productosFiltrados = productos.filter(producto => producto.desarrollador === desarrollador);
        productosFiltrados.forEach(producto => {
          producto.descuento = descuento;
          this.productoService.editarProducto(producto.id!, producto); // Actualizar en Firebase
        });
        return productosFiltrados;
      })
    );
  }

  aplicarDescuentoPorPublisher(publisher: string, descuento: number): Observable<Producto[]> {
    return this.productoService.getProductos().pipe(
      map(productos => {
        const productosFiltrados = productos.filter(producto => producto.publisher === publisher);
        productosFiltrados.forEach(producto => {
          producto.descuento = descuento;
          this.productoService.editarProducto(producto.id!, producto); // Actualizar en Firebase
        });
        return productosFiltrados;
      })
    );
  }

  aplicarDescuentoGeneral(descuento: number): Observable<Producto[]> {
    return this.productoService.getProductos().pipe(
      map(productos => {
        productos.forEach(producto => {
          producto.descuento = descuento;
          this.productoService.editarProducto(producto.id!, producto); // Actualizar en Firebase
        });
        return productos;
      })
    );
  }
}
