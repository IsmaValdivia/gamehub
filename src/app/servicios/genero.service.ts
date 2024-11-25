import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Genero } from '../modelo/iGenero';
import { from, map, Observable, switchMap } from 'rxjs';
import { Producto } from '../modelo/iProducto';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private generosCollection: AngularFirestoreCollection<Genero>;

  constructor(private afs: AngularFirestore) {
    this.generosCollection = afs.collection<Genero>('Generos');
  }

  obtenerGeneros(): Observable<Genero[]> {
    return this.generosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Genero;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getGeneros(): Observable<any[]> {
    return this.afs.collection('Generos').valueChanges();
  }

  agregarGenero(genero: Omit<Genero, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.generosCollection.doc(id).set({ ...genero, id });
  }

  obtenerGeneroPorId(id: string): Observable<Genero | undefined> {
    return this.generosCollection.doc<Genero>(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        if (data) {
          return { id: action.payload.id, ...data };
        } else {
          return undefined; // Si no existe el género
        }
      })
    );
  }

  editarGenero(id: string, genero: Genero): Promise<void> {
    return this.generosCollection.doc(id).update(genero);
  }

  eliminarGenero(id: string): Promise<void> {
    return this.generosCollection.doc(id).delete();
  }

}
