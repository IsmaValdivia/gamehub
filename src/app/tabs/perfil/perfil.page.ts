import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};
  editMode: boolean = false;
  uid: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  // Cargar datos del perfil del usuario autenticado
  cargarPerfil() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.usuarioService.getUsuario().subscribe(usuario => {
          this.usuario = usuario;
        });
      }
    });
  }

  editarPerfil() {
    this.editMode = true;
  }

  cancelarEdicion() {
    this.editMode = false;
    this.cargarPerfil(); // Recargar datos
  }

  guardarCambios() {
    this.usuarioService.updateUsuario(this.uid, this.usuario).then(() => {
      this.showToast('Perfil actualizado correctamente.', 'success');
      this.editMode = false;
    }).catch((error) => {
      this.showToast('Error al actualizar el perfil.', 'danger');
    });
  }

  eliminarCuenta() {
    this.usuarioService.deleteUsuario(this.uid).then(() => {
      this.afAuth.signOut().then(() => {
        this.router.navigate(['/sesion/login']);
        this.showToast('Cuenta eliminada exitosamente', 'success');
      });
    }).catch((error) => {
      this.showToast('Error eliminar cuenta.', 'danger');
    });
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/sesion/login']);
      this.showToast('Sesión cerrada correctamente.', 'success');
    }).catch((error) => {
      this.showToast('Error al cerrar sesión.', 'danger');
    });
  }

  // Mostrar el Toast
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
