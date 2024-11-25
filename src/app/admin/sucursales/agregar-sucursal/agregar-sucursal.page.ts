import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.page.html',
  styleUrls: ['./agregar-sucursal.page.scss'],
})
export class AgregarSucursalPage {
  sucursalForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sucursalService: SucursalService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.sucursalForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      fono: ['', Validators.required]
    });
  }

  async agregarSucursal() {
    if (this.sucursalForm.invalid) {
      this.mostrarToast('Por favor, completa todos los campos correctamente', 'danger');
      return;
    }

    const nuevaSucursal = {
      nombre: this.sucursalForm.value.nombre,
      correo: this.sucursalForm.value.correo,
      direccion: this.sucursalForm.value.direccion,
      fono: this.sucursalForm.value.fono
    };

    try {
      await this.sucursalService.agregarSucursal(nuevaSucursal);
      this.mostrarToast('Sucursal agregada con éxito', 'success');
      this.navCtrl.back();
    } catch (error) {
      console.error('Error al agregar sucursal:', error);
      this.mostrarToast('Error al agregar la sucursal', 'danger');
    }
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color,
      duration: 2000,
    });
    toast.present();
  }

}
