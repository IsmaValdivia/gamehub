import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Sucursal } from 'src/app/modelo/iSucursal';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.page.html',
  styleUrls: ['./editar-sucursal.page.scss'],
})
export class EditarSucursalPage implements OnInit {
  sucursalForm: FormGroup;
  sucursalId!: string;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {

    this.sucursalForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      fono: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sucursalId = this.route.snapshot.paramMap.get('id')!;
    this.cargarSucursal(this.sucursalId);
  }

  async cargarSucursal(id: string) {
    this.sucursalService.obtenerSucursal(id).subscribe(
      async (sucursal) => {
        if (sucursal) {
          this.sucursalForm.patchValue({
            nombre: sucursal.nombre,
            correo: sucursal.correo,
            direccion: sucursal.direccion,
            fono: sucursal.fono
          });
        } else {
          const toast = await this.toastController.create({
            message: 'No se encontró la sucursal.',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
          this.router.navigate(['/admin/sucursales']);
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Error al cargar la sucursal.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }

  async editarSucursal() {
    if (this.sucursalForm.valid) {
      const sucursalEditada: Sucursal = {
        id: this.sucursalId,
        nombre: this.sucursalForm.value.nombre,
        correo: this.sucursalForm.value.correo,
        direccion: this.sucursalForm.value.direccion,
        fono: this.sucursalForm.value.fono
      };

      try {
        await this.sucursalService.editarSucursal(this.sucursalId, sucursalEditada);
        const toast = await this.toastController.create({
          message: 'Sucursal actualizada con éxito.',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/admin/sucursales/listar-sucursal']);
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al actualizar la sucursal.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    }
  }
}
