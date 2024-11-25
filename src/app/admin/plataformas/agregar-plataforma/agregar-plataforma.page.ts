import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PlataformaService } from 'src/app/servicios/plataforma.service';

@Component({
  selector: 'app-agregar-plataforma',
  templateUrl: './agregar-plataforma.page.html',
  styleUrls: ['./agregar-plataforma.page.scss'],
})
export class AgregarPlataformaPage {
  plataformaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private plataformaService: PlataformaService,
    private toastController: ToastController
  ) {
    this.plataformaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  async agregarPlataforma() {
    if (this.plataformaForm.valid) {
      try {
        await this.plataformaService.agregarPlataforma(this.plataformaForm.value);
        this.mostrarToast('Plataforma agregada exitosamente', 'success');
        this.plataformaForm.reset(); // Resetea el formulario después de agregar
      } catch (error) {
        console.error('Error al agregar plataforma:', error);
        this.mostrarToast('Error al agregar la plataforma', 'danger');
      }
    } else {
      this.mostrarToast('Por favor, complete todos los campos', 'warning');
    }
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
