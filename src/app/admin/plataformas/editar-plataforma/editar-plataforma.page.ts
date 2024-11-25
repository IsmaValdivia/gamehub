import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plataforma } from 'src/app/modelo/iPlataforma';
import { PlataformaService } from 'src/app/servicios/plataforma.service';

@Component({
  selector: 'app-editar-plataforma',
  templateUrl: './editar-plataforma.page.html',
  styleUrls: ['./editar-plataforma.page.scss'],
})
export class EditarPlataformaPage implements OnInit {
  plataforma: Plataforma = { nombre: '' };
  plataformaId: string | null = null;

  constructor(
    private plataformaService: PlataformaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.plataformaId = this.route.snapshot.paramMap.get('id');
    if (this.plataformaId) {
      this.plataformaService.obtenerPlataformaPorId(this.plataformaId).subscribe((plataforma) => {
        this.plataforma = plataforma;
      });
    }
  }

  async guardarCambios() {
    if (this.plataformaId) {
      await this.plataformaService.editarPlataforma(this.plataformaId, this.plataforma);
      this.presentToast('Plataforma actualizada correctamente', 'success');
      this.router.navigate(['/admin/dashboard-admin']);
    }
  }

  async presentToast(message: string,color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }
}
