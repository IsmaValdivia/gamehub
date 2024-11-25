import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Genero } from 'src/app/modelo/iGenero';
import { GeneroService } from 'src/app/servicios/genero.service';

@Component({
  selector: 'app-listar-generos',
  templateUrl: './listar-generos.page.html',
  styleUrls: ['./listar-generos.page.scss'],
})
export class ListarGenerosPage implements OnInit {
  generos: Genero[] = [];

  constructor(
    private generoService: GeneroService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarGeneros();
  }

  cargarGeneros() {
    this.generoService.obtenerGeneros().subscribe((generos) => {
      this.generos = generos;
    });
  }

  async confirmarEliminarGenero(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este género?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarGenero(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminarGenero(id: string) {
    await this.generoService.eliminarGenero(id);
    const toast = await this.toastController.create({
      message: 'Género eliminado correctamente.',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}
