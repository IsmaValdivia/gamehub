import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iDeseados } from '../modelo/iDeseados';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private coleccion = 'Deseados';

  constructor(private firestore: AngularFirestore) {}

  // Agregar un juego a la lista de deseados
  agregarADeseados(juego: iDeseados): Promise<void> {
    const docRef = this.firestore.collection('Deseados').doc(juego.id);
    return docRef.set(juego);
  }

  // Obtener la lista de juegos deseados para un usuario
  obtenerDeseados(usuarioId: string) {
    return this.firestore.collection<iDeseados>(this.coleccion, ref =>
      ref.where('usuarioId', '==', usuarioId)
    ).valueChanges({ idField: 'id' });
  }

  // Eliminar un juego de la lista de deseados
  eliminarJuego(deseadoId: string) {
    return this.firestore.collection(this.coleccion).doc(deseadoId).delete();
  }

}
