import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Genero } from 'src/app/modelo/iGenero';
import { GeneroService } from 'src/app/servicios/genero.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.page.html',
  styleUrls: ['./editar-genero.page.scss'],
})
export class EditarGeneroPage implements OnInit {
  genero: Genero = { nombre: '' };

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.generoService.obtenerGeneroPorId(id).subscribe((genero) => {
        if (genero) {
          this.genero = genero;
          this.genero.id = id;
        }
      });
    }
  }

  async actualizarGenero() {
    if (this.genero.nombre.trim().length === 0) {
      const toast = await this.toastController.create({
        message: 'El nombre del género no puede estar vacío.',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    try {
      await this.generoService.editarGenero(this.genero.id!, { nombre: this.genero.nombre });
      const toast = await this.toastController.create({
        message: 'Género actualizado exitosamente.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.navCtrl.navigateBack('/admin/generos/listar-generos');
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al actualizar el género. Intente nuevamente.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }
}
