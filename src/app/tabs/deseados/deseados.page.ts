import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { iDeseados } from 'src/app/modelo/iDeseados';
import { AuthService } from 'src/app/servicios/auth.service';
import { WishlistService } from 'src/app/servicios/wishlist.service';

@Component({
  selector: 'app-deseados',
  templateUrl: './deseados.page.html',
  styleUrls: ['./deseados.page.scss'],
})
export class DeseadosPage implements OnInit {
  deseados: iDeseados[] = [];
  usuarioId: string | null = null; // Obtén este valor del servicio de autenticación

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerUsuarioActual();
  }

  async obtenerUsuarioActual() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.uid) {
        this.usuarioId = user.uid; // Obtén el UID del usuario autenticado
        this.cargarDeseados(); // Carga la lista de deseados para este usuario
      } else {
        console.warn('No se pudo identificar al usuario.');
      }
    });
  }

  cargarDeseados() {
    if (this.usuarioId) {
      this.wishlistService.obtenerDeseados(this.usuarioId).subscribe(data => {
        this.deseados = data;
      });
    }
  }

  async agregarAlCarrito(juego: iDeseados) {
    // Aquí llamas al servicio de carrito (implementado previamente)
    // carritoService.agregarAlCarrito(juego);

    await this.mostrarToast(`${juego.nombre} agregado al carrito`, 'success');
  }

  eliminarDeseado(id: string) {
    this.wishlistService.eliminarJuego(id).then(() => {
      this.mostrarToast('Juego eliminado de la lista de deseados', 'danger');
    });
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
