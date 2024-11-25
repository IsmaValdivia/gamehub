import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';  // ToastController para los mensajes
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage {
  correo!: string;
  password!: string;
  nombre!: string;
  telefono!: string;
  direccion!: string;
  aceptarTerminos: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastController: ToastController,
    private router: Router,  // Servicio de ToastController  // Inyectamos el servicio de Firebase Storage
  ) {}

  ngOnInit() {
  }

  async registrar() {
    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.correo,
        this.password
      );
      const uid = userCredential.user?.uid;

      if (uid) {
        // Crear el documento en Firestore bajo la colección 'usuarios'
        await this.afs.collection('usuarios').doc(uid).set({
          nombre: this.nombre,
          correo: this.correo,
          telefono: this.telefono || '',
          direccion: this.direccion || '',
        });

        // Mostrar mensaje de éxito
        this.showToast('Usuario registrado exitosamente.', 'success');
        // Redirigir al inicio de sesión o pantalla principal
        this.router.navigate(['/login']);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.showToast('Error en el registro: ' + error.message, 'danger');
      } else {
        this.showToast('Ocurrió un error desconocido.', 'danger');
      }
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
