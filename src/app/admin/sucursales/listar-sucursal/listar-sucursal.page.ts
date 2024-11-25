import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Sucursal } from 'src/app/modelo/iSucursal';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.page.html',
  styleUrls: ['./listar-sucursal.page.scss'],
})
export class ListarSucursalPage implements OnInit {
  sucursales: Sucursal[] = [];

  constructor(
    private sucursalService: SucursalService,
    private alertController: AlertController,
    private toastController: ToastController,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales) => {
      this.sucursales = sucursales;
    });
  }

  async eliminarSucursal(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas eliminar esta sucursal?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.sucursalService.eliminarSucursal(id)
              .then(() => this.mostrarToast('Sucursal eliminada con éxito', 'success'))
              .catch((error) => {
                console.error('Error al eliminar sucursal: ', error);
                this.mostrarToast('Error al eliminar sucursal', 'danger');
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
    });
    toast.present();
  }

  editarSucursal(sucursal: Sucursal) {
    this.router.navigate(['/admin/sucursales/editar-sucursal', sucursal.id]);
  }

  abrirEnGoogleMaps(direccion: string) {
    const direccionUrl = encodeURIComponent(direccion); // Codifica la dirección para URL
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionUrl}`;
    window.open(url, '_blank'); // Abre la dirección en una nueva pestaña o en Google Maps si está instalado
  }

  back(): void {
    this.location.back()
  }
}
