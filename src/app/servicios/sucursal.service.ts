import { Injectable } from '@angular/core';
import { Sucursal } from '../modelo/iSucursal';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private sucursalesCollection = this.firestore.collection<Sucursal>('Sucursales');

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las sucursales
  getSucursales(): Observable<Sucursal[]> {
    return this.sucursalesCollection.valueChanges({ idField: 'id' });
  }

  // Eliminar sucursal por ID
  eliminarSucursal(id: string): Promise<void> {
    return this.firestore.doc(`Sucursales/${id}`).delete();
  }

  // Agregar sucursal
  agregarSucursal(sucursal: Omit<Sucursal, 'id'>): Promise<void> {
    const id = this.firestore.createId();
    return this.sucursalesCollection.doc(id).set({ ...sucursal, id });
  }

  obtenerSucursal(id: string): Observable<Sucursal | undefined> {
    return this.sucursalesCollection.doc<Sucursal>(id).valueChanges();
  }

  editarSucursal(id: string, sucursal: Sucursal): Promise<void> {
    return this.sucursalesCollection.doc<Sucursal>(id).update(sucursal);
  }
}
