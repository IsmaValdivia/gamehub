import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  // Obtener datos del usuario autenticado
  getUsuario(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('usuarios').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Actualizar los datos del usuario
  updateUsuario(id: string, data: any) {
    return this.afs.collection('usuarios').doc(id).update(data);
  }

  // Eliminar la cuenta del usuario
  deleteUsuario(id: string) {
    return this.afs.collection('usuarios').doc(id).delete();
  }
}
