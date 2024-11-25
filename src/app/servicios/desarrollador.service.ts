import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  private coleccionDesarrolladores = this.firestore.collection('Desarrollador');

  constructor(private firestore: AngularFirestore) { }

  getDesarrolladores(): Observable<number> {
    return this.coleccionDesarrolladores.get().pipe(
      map(snapshot => snapshot.size) 
    );
  }
}
