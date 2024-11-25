import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Plataforma } from 'src/app/modelo/iPlataforma';
import { PlataformaService } from 'src/app/servicios/plataforma.service';

@Component({
  selector: 'app-listar-plataformas',
  templateUrl: './listar-plataformas.page.html',
  styleUrls: ['./listar-plataformas.page.scss'],
})
export class ListarPlataformasPage implements OnInit {
  plataformas: Plataforma[] = [];

  constructor(
    private plataformaService: PlataformaService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerPlataformas();
  }

  obtenerPlataformas() {
    this.plataformaService.obtenerPlataformas().subscribe(plataformas => {
      this.plataformas = plataformas;
    });
  }

  private async eliminarPlataforma(id: string) {
    try {
      await this.plataformaService.eliminarPlataforma(id);
      this.mostrarToast('Plataforma eliminada exitosamente', 'success');
    } catch (error) {
      console.error('Error al eliminar plataforma:', error);
      this.mostrarToast('Error al eliminar la plataforma', 'danger');
    }
  }

  async confirmarEliminarPlataforma(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta plataforma?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarPlataforma(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }
}
