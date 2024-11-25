import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private coleccionPublishers = this.firestore.collection('Publisher');

  constructor(private firestore: AngularFirestore) { }

  getPublishers(): Observable<number> {
    return this.coleccionPublishers.get().pipe(
      map(snapshot => snapshot.size) 
    );
  }
}
