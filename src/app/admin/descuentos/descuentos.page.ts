import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GeneroService } from 'src/app/servicios/genero.service';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.page.html',
  styleUrls: ['./descuentos.page.scss'],
})
export class DescuentosPage implements OnInit {
  generos: any[] = []; // Array para almacenar los géneros disponibles
  generosSeleccionados: any[] = []; // Array para almacenar géneros seleccionados
  mensajeConfirmacion: string | null = null; // Mensaje de éxito

  constructor(
    private productoService: ProductoService,
    private generoService: GeneroService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerGeneros();
  }

  obtenerGeneros() {
    this.generoService.obtenerGeneros().subscribe((generos: any[]) => {
      this.generos = generos;
    });
  }

  aplicarDescuento() {
    this.productoService.aplicarDescuentoPorGeneroYPrecio(this.generosSeleccionados)
      .then(() => {
        this.mostrarToast('Descuentos aplicados exitosamente', 'success');
      })
      .catch((error) => {
        console.error(error);
        this.mostrarToast('Error al aplicar descuentos', 'danger');
      });
  }

  async revertirDescuento() {
    if (this.generosSeleccionados.length > 0) {
      try {
        // Llamamos al servicio para revertir los descuentos
        await this.productoService.revertirDescuentoPorGeneroYPrecio(this.generosSeleccionados);
        
        // Mostrar mensaje de éxito
        this.mostrarToast('Descuento revertido exitosamente', 'success');
      } catch (error) {
        // En caso de error, mostrar mensaje de fallo
        console.error("Error al revertir descuento:", error);
        this.mostrarToast('Error al revertir los descuentos', 'danger');
      }
    } else {
      console.warn("Selecciona al menos un género para revertir el descuento.");
      this.mostrarToast('Selecciona al menos un género para revertir el descuento', 'warning');
    }
  }

  // Método para mostrar mensajes de Toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}

