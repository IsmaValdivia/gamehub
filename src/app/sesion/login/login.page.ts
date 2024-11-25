import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController 
  ) { }

  ngOnInit() {
  }


  // Método para iniciar sesión
  onLogin(form: FormGroup) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password)
        .then(() => {
          this.showToast('¡Hola, bienvenid@ a GameHub!', 'success');  // Mostrar mensaje de éxito
          this.navCtrl.navigateForward('/tabs/inicio');  // Navegar a la página de inicio
        })
        .catch(err => {
          this.showToast('Error al iniciar sesión: ' + err.message, 'danger');  // Mostrar mensaje de error
        });
    } else {
      this.showToast('Por favor, completa todos los campos', 'warning');  // Validación de campos
    }
  }

  // Método para mostrar un Toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,  // Duración del toast
      color: color,    // Color según el tipo de mensaje
      position: 'top'  // Posición del toast
    });
    toast.present();
  }
}
