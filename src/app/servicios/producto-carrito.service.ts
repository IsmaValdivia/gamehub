import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Producto } from '../modelo/iProducto';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductoCarritoService {
  private productosCollection = this.firestore.collection<Producto>('Products');

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  // Método para obtener productos
  getProductos(): Observable<Producto[]> {
    return this.productosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { ...data, id }; // Corregimos el orden del spread para evitar sobrescribir
      }))
    );
  }


  // Obtener productos recomendados
  obtenerProductosRecomendados(): Observable<any[]> {
    return this.firestore.collection('Products', ref => ref.where('recomendado', '==', true))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;  // data es tratado como objeto
          const id = a.payload.doc.id;
          return { id, ...data }; 
        }))
      );
  }

  // Obtener el producto con menor stock superior a 0 (top 1 en ventas)
  obtenerTopProducto(): Observable<any> {
    return this.firestore.collection('Products', ref => ref.where('stock', '>', 0).orderBy('stock', 'asc').limit(1))
      .snapshotChanges().pipe(
        map(actions => {
          const a = actions[0];
          const data = a.payload.doc.data() as any; 
          const id = a.payload.doc.id;
          return { id, ...data };  
        })
      );
  }

  getPlataformas(): Observable<any[]> {
    return this.firestore.collection('Plataformas').valueChanges();
  }
  
  getGeneros(): Observable<any[]> {
    return this.firestore.collection('Generos').valueChanges();
  }

  eliminarProducto(id: string, imageUrl: string): Promise<void> {
    if (imageUrl) {
      const storageRef = this.storage.refFromURL(imageUrl);
      return storageRef.delete().toPromise().then(() => {
        return this.productosCollection.doc(id).delete();
      }).catch(error => {
        console.error('Error al eliminar la imagen:', error);
        return this.productosCollection.doc(id).delete(); // Continuamos eliminando el producto
      });
    } else {
      return this.productosCollection.doc(id).delete();
    }
  }

  agregarProducto(producto: Producto, imagenFile: File): Promise<void> {
    const filePath = `juegos/${producto.id}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imagenFile);
  
    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              producto.imagen = url;
              this.productosCollection.doc(producto.id).set(producto).then(() => {
                resolve(); // Resolvemos la promesa después de guardar el producto
              }).catch((error) => {
                reject(error); // Manejamos errores al guardar en Firestore
              });
            },
            error: (error) => {
              reject(error); // Manejamos errores al obtener la URL
            }
          });
        })
      ).subscribe({
        error: (error) => {
          reject(error); // Manejamos errores de subida de imagen
        }
      });
    });
  }

}
