import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Plataforma } from '../modelo/iPlataforma';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  private plataformasCollection: AngularFirestoreCollection<Plataforma>;

  constructor(private afs: AngularFirestore) {
    this.plataformasCollection = afs.collection<Plataforma>('Plataformas');
  }

  obtenerPlataformas(): Observable<Plataforma[]> {
    return this.plataformasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Plataforma;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  agregarPlataforma(plataforma: Plataforma): Promise<void> {
    const id = this.afs.createId();
    return this.plataformasCollection.doc(id).set({ ...plataforma, id });
  }

  obtenerPlataformaPorId(id: string): Observable<Plataforma> {
    return this.plataformasCollection.doc<Plataforma>(id).valueChanges().pipe(
      map(plataforma => ({ id, ...plataforma! }))
    );
  }

  editarPlataforma(id: string, plataforma: Plataforma): Promise<void> {
    return this.plataformasCollection.doc(id).update(plataforma);
  }

  eliminarPlataforma(id: string): Promise<void> {
    return this.plataformasCollection.doc(id).delete();
  }
}
