import { Component, OnInit } from '@angular/core';
import { ProductoCarritoService } from 'src/app/servicios/producto-carrito.service';
import { Producto } from 'src/app/modelo/iProducto';
import { NavController } from '@ionic/angular';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ICarrito } from 'src/app/modelo/iCarrito';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  productos: Producto[] = [];
  productosRecomendados: any[] = [];
  topProducto: any;

  constructor(
    private productoCarritoService: ProductoCarritoService,
    private navCtrl: NavController,
    private carritoService: CarritoService,

  ) {}

  ngOnInit() {
    // Obtener productos recomendados
    this.productoCarritoService.obtenerProductosRecomendados().subscribe(productos => {
      this.productosRecomendados = productos;
    });
    
    // Obtener top 1 en ventas
    this.productoCarritoService.obtenerTopProducto().subscribe(producto => {
      this.topProducto = producto;
    });
  }

  irAWishlist() {
    this.navCtrl.navigateForward('/tabs/deseados');
  }

  irAResenas() {
    this.navCtrl.navigateForward('/tabs/resenas');
  }

  irATienda() {
    this.navCtrl.navigateForward('/tabs/tienda');
  }

  agregarAlCarrito(juego: any) {
    const producto: ICarrito = {
      id: juego.id,
      nombre: juego.nombre,
      imagen: juego.imagen,
      precio: juego.precio,
      cantidad: 1
    };
    this.carritoService.agregarAlCarrito(producto);
  }

  agregarADeseados(juego: Producto) {
    // Lógica para añadir a deseados
    console.log('Producto añadido a deseados:', juego);
  }

  getPrecioConDescuento(precio: number, descuento: number): number {
    return descuento ? precio * (1 - descuento / 100) : precio;
  }


}
