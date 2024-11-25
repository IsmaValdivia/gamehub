import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICarrito } from 'src/app/modelo/iCarrito';
import { iDeseados } from 'src/app/modelo/iDeseados';
import { AuthService } from 'src/app/servicios/auth.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoCarritoService } from 'src/app/servicios/producto-carrito.service';
import { WishlistService } from 'src/app/servicios/wishlist.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  plataformas: any[] = [];
  generos: any[] = [];
  productos: any[] = [];
  filteredProductos: any[] = [];
  searchTerm: string = '';
  selectedPlataforma: string = '';
  selectedGeneros: string[] = [];  // Cambiado a array para selección múltiple
  usuarioId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private productoCarritoService: ProductoCarritoService,
    private router: Router,
    private carritoService: CarritoService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.productoCarritoService.getPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
    });

    this.productoCarritoService.getGeneros().subscribe((generos) => {
      this.generos = generos;
    });
    this.cargarProductos();

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.usuarioId = user.uid; // Asignar UID si hay un usuario autenticado
      } else {
        this.usuarioId = null; // Usuario no autenticado
      }
    });
  }

  cargarPlataformas() {
    this.productoCarritoService.getPlataformas().subscribe(data => {
      this.plataformas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }
  
  cargarGeneros() {
    this.productoCarritoService.getGeneros().subscribe(data => {
      this.generos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }
  
  cargarProductos() {
    this.productoCarritoService.getProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = this.productos;  // Mostrar todos los productos inicialmente
    });
  }

  searchJuegos() {
    this.filteredProductos = this.productos.filter(juego => {
      // Filtro por plataforma
      const plataformaValida = !this.selectedPlataforma || juego.plataforma === this.selectedPlataforma;

      // Filtro por géneros seleccionados (múltiple)
      const generoValido = this.selectedGeneros.length === 0 || 
                           this.selectedGeneros.some(genero => juego.genero.includes(genero));

      // Filtro por término de búsqueda
      const terminoValido = !this.searchTerm || juego.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());

      return plataformaValida && generoValido && terminoValido;
    });
  }
  
  limpiarFiltros() {
    this.selectedPlataforma = '';
    this.selectedGeneros = [];  // Reiniciar selección múltiple
    this.searchTerm = '';
    this.filteredProductos = this.productos;
  }

  agregarAlCarrito(juego: any) {
    const producto: ICarrito = {
      id: juego.id,
      nombre: juego.nombre,
      imagen: juego.imagen,
      precio: juego.precio,
      cantidad: 1,
      plataforma: juego.plataforma
    };
    this.carritoService.agregarAlCarrito(producto);
  }

  async agregarADeseados(juego: iDeseados) {
    if (!this.usuarioId) {
      // Mostrar toast indicando que no hay sesión activa
      await this.mostrarToast('Debes iniciar sesión para agregar a deseados.', 'danger');
      return;
    }
  
    const juegoDeseado: iDeseados = {
      id: juego.id || this.firestore.createId(),
      usuarioId: this.usuarioId, // Asigna el ID del usuario autenticado
      nombre: juego.nombre,
      imagen: juego.imagen,
      precio: juego.precio,
    };
  
    this.wishlistService.agregarADeseados(juegoDeseado)
      .then(() => this.mostrarToast('Juego agregado a deseados.', 'success'))
      .catch(err => {
        console.error('Error al agregar a deseados:', err);
        this.mostrarToast('Error al agregar a deseados.', 'danger');
      });
  }

  irAdmin() {
    this.router.navigate(['/admin/dashboard-admin']);
  }

  getPrecioConDescuento(precio: number, descuento: number): number {
    return descuento ? precio * (1 - descuento / 100) : precio;
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
