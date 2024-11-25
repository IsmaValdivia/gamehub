import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { from, Observable, firstValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Producto } from '../modelo/iProducto';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FieldValue, deleteField } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosCollection = this.firestore.collection<Producto>('Products');

  constructor(
    private firestore: AngularFirestore, 
    private storage: AngularFireStorage
  ) { }

  // Método para obtener productos desde Firebase
  getProductos(): Observable<Producto[]> {
    return this.productosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;  // Rescatamos el UID generado por Firebase
        return { id, ...data };  // Incluimos el UID en el producto
      }))
    );
  }

  // Método para agregar un nuevo producto con desarrollador y publisher
  agregarProductoConDetalles(producto: Omit<Producto, 'id'>) {
    return from(this.verificarYAgregarDesarrollador(producto.desarrollador))
      .pipe(
        switchMap(() => this.verificarYAgregarPublisher(producto.publisher)),
        switchMap(() => this.productosCollection.add(producto))
      );
  }

  // Método para verificar y agregar el desarrollador
  public async verificarYAgregarDesarrollador(nombreDesarrollador?: string): Promise<void> {
    if (!nombreDesarrollador) return;

    const desarrolladorRef = this.firestore.collection('Desarrollador', ref => 
      ref.where('nombre', '==', nombreDesarrollador)
    );

    const snapshot = await desarrolladorRef.get().toPromise();

    if (snapshot && snapshot.empty) {
      await this.firestore.collection('Desarrollador').add({ nombre: nombreDesarrollador });
    }
  }

  // Método para verificar y agregar el publisher
  public async verificarYAgregarPublisher(nombrePublisher?: string): Promise<void> {
    if (!nombrePublisher) return;

    const publisherRef = this.firestore.collection('Publisher', ref => 
      ref.where('nombre', '==', nombrePublisher)
    );

    const snapshot = await publisherRef.get().toPromise();

    if (snapshot && snapshot.empty) {
      await this.firestore.collection('Publisher').add({ nombre: nombrePublisher });
    }
  }

  // Método para obtener un producto por ID
  obtenerProducto(id: string): Observable<Producto | undefined> {
    return this.firestore.doc<Producto>(`Products/${id}`).valueChanges();
  }
  
  // Eliminar producto
  eliminarProducto(id: string, imagenUrl?: string): Promise<void> {
    return this.firestore.doc(`Products/${id}`).delete().then(() => {
      if (imagenUrl) {
        return this.storage.refFromURL(imagenUrl).delete().toPromise();
      } else {
        // Si no hay imagen que eliminar, se devuelve una promesa resuelta.
        return Promise.resolve();
      }
    });
  }

   // Método para subir imagen a Firebase Storage y devolver la URL
   subirImagen(file: File): Promise<string> {
    const filePath = `juegos/${file.name}`; // Define la ruta donde guardar la imagen
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); // Subir archivo

    return task.then(() => {
      return fileRef.getDownloadURL().toPromise(); // Obtener URL después de subir
    });
  }

  async aplicarDescuentoPorGeneroYPrecio(generosSeleccionados: any[]): Promise<void> {
    if (!generosSeleccionados || generosSeleccionados.length === 0) {
      console.warn("No se seleccionaron géneros.");
      return;
    }
  
    const generosValidos = generosSeleccionados.map(genero => {
      if (typeof genero === 'object' && genero.nombre) {
        return genero.nombre;
      }
      if (typeof genero === 'string') {
        return genero;
      }
      console.error("Género no válido:", genero);
      return null;
    }).filter(genero => genero !== null);
  
    if (generosValidos.length === 0) {
      console.warn("No hay géneros válidos seleccionados.");
      return;
    }
  
    try {
      console.log(`Buscando productos con géneros: ${generosValidos.join(", ")}`);
      
      const productosSnapshot = await firstValueFrom(this.firestore.collection('Products', ref =>
        ref.where('genero', 'array-contains-any', generosValidos)
      ).get()) as QuerySnapshot<any>;
  
      if (productosSnapshot.empty) {
        console.warn("No se encontraron productos.");
        return;
      }
  
      const batch = this.firestore.firestore.batch();
      productosSnapshot.docs.forEach((doc) => {
        const productoData = doc.data();
        console.log(`Producto: ${productoData.nombre}, Precio: ${productoData.precio}`);
  
        const nuevoPrecio = this.calcularNuevoPrecio(productoData.precio);
        const precioConDescuentoRedondeado = Math.round(nuevoPrecio.precioConDescuento * 100) / 100;
  
        // Guardar el precio original antes de aplicar el descuento
        batch.update(doc.ref, { 
          descuento: nuevoPrecio.descuento,
          precio: precioConDescuentoRedondeado,
          precioOriginal: productoData.precio // Guardar el precio original
        });
      });
  
      console.log("Aplicando cambios en Firebase...");
      await batch.commit();
      console.log("Descuentos aplicados.");
    } catch (error) {
      console.error("Error al aplicar descuentos:", error);
    }
  }

  async revertirDescuentoPorGeneroYPrecio(generosSeleccionados: any[]): Promise<void> {
    if (!generosSeleccionados || generosSeleccionados.length === 0) {
      console.warn("No se seleccionaron géneros.");
      return;
    }
  
    const generosValidos = generosSeleccionados.map(genero => {
      if (typeof genero === 'object' && genero.nombre) {
        return genero.nombre;
      }
      if (typeof genero === 'string') {
        return genero;
      }
      console.error("Género no válido:", genero);
      return null;
    }).filter(genero => genero !== null);
  
    if (generosValidos.length === 0) {
      console.warn("No hay géneros válidos seleccionados.");
      return;
    }
  
    try {
      console.log(`Buscando productos con géneros: ${generosValidos.join(", ")}`);
      
      const productosSnapshot = await firstValueFrom(this.firestore.collection('Products', ref =>
        ref.where('genero', 'array-contains-any', generosValidos)
      ).get()) as QuerySnapshot<any>;
  
      if (productosSnapshot.empty) {
        console.warn("No se encontraron productos.");
        return;
      }
  
      const batch = this.firestore.firestore.batch();
      productosSnapshot.docs.forEach((doc) => {
        const productoData = doc.data();
        console.log(`Producto: ${productoData.nombre}, Precio con descuento: ${productoData.precio}`);
  
        // Verificar si el precio original está disponible
        if (productoData.precioOriginal !== undefined) {
          // Restaurar el precio original
          batch.update(doc.ref, { 
            precio: productoData.precioOriginal,
            descuento: 0, // Restablecer el descuento a 0
            precioOriginal: deleteField() // Eliminar el campo precioOriginal
          });
        } else {
          console.warn(`El producto ${productoData.nombre} no tiene un precio original guardado.`);
        }
      });
  
      console.log("Aplicando cambios en Firebase...");
      await batch.commit();
      console.log("Descuentos revertidos.");
    } catch (error) {
      console.error("Error al revertir descuentos:", error);
    }
  }
  
  // Método auxiliar para calcular el nuevo precio y descuento
  private calcularNuevoPrecio(precioOriginal: number): { precioConDescuento: number; descuento: number } {
    let descuento = 0;
  
    if (precioOriginal <= 9990) {
      descuento = 10;
    } else if (precioOriginal > 9990 && precioOriginal <= 25000) {
      descuento = 20;
    } else if (precioOriginal > 25000 && precioOriginal <= 35000) {
      descuento = 30;
    } else if (precioOriginal > 35000) {
      descuento = 40;
    }
  
    const precioConDescuento = precioOriginal * (1 - descuento / 100);
    return { precioConDescuento, descuento };
  }

  agregarProducto(producto: Omit<Producto, 'id'>) {
    return this.firestore.collection('Products').add(producto);
  }

  // Método para obtener las plataformas
  obtenerPlataformas() {
    return this.firestore.collection('Plataformas').valueChanges();
  }

  // Método para obtener los géneros
  obtenerGeneros() {
    return this.firestore.collection('Generos').valueChanges();
  }

  editarProducto(id: string, producto: Producto) {
    return this.firestore.doc(`Products/${id}`).update(producto);
  }
}
