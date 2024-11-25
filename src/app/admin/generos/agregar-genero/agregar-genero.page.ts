import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { GeneroService } from 'src/app/servicios/genero.service';

@Component({
  selector: 'app-agregar-genero',
  templateUrl: './agregar-genero.page.html',
  styleUrls: ['./agregar-genero.page.scss'],
})
export class AgregarGeneroPage {
  nombre: string = '';

  constructor(
    private generoService: GeneroService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async agregarGenero() {
    if (this.nombre.trim().length === 0) {
      const toast = await this.toastController.create({
        message: 'El nombre del género no puede estar vacío.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    try {
      await this.generoService.agregarGenero({ nombre: this.nombre });
      const toast = await this.toastController.create({
        message: 'Género agregado exitosamente.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
      this.navCtrl.navigateBack('/admin/generos/listar-generos');
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al agregar el género. Intente nuevamente.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }
}
