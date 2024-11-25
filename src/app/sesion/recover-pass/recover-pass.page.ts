import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.page.html',
  styleUrls: ['./recover-pass.page.scss'],
})
export class RecoverPassPage {
  email: string = '';

  constructor(
    private authService: AuthService, 
    private toastCtrl: ToastController,
    private router: Router
  ) { }


  async recuperarClave() {
    try {
      await this.authService.enviarRecuperacionCorreo(this.email);
      const toast = await this.toastCtrl.create({
        message: 'Enlace de recuperación enviado.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al enviar el enlace.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  volverLogin(){
    this.router.navigate(["/sesion/login"]);
  }

}
