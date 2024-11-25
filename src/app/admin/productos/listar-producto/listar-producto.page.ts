import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Producto } from 'src/app/modelo/iProducto';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
})
export class ListarProductoPage implements OnInit {
  productos: Producto[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  // Cargar los productos desde Firebase al iniciar
  cargarProductos(): Observable<Producto[]> {
    return this.firestore.collection<Producto>('Products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;  // Rescatar el UID de Firebase
        return { id, ...data };  // Aseguramos que el ID se incluye en el producto
      }))
    );
  }

  // Función para eliminar un producto
  async eliminarProducto(id: string | undefined, imagen: string | undefined) {
    if (!id) {
      this.mostrarToast('Error: No se puede eliminar un producto sin ID', 'danger');
      return;
    }
  
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            return this.firestore.doc(`Products/${id}`).delete()
            .then(() => {
              if (imagen) {
                return this.storage.refFromURL(imagen).delete().toPromise();
              } else {
                return Promise.resolve();  // Asegurarse de que siempre retornamos una promesa
              }
            })
            .then(() => {
              this.mostrarToast('Producto eliminado con éxito', 'success');
            })
            .catch(error => {
              this.mostrarToast('Error al eliminar el producto', 'danger');
              console.error('Error al eliminar el producto: ', error);
            });
          },
        },
      ],
    });
  
    await alert.present();
  }

  // Función para editar un producto, redirige a la página de edición
  editarProducto(producto: Producto) {
    this.router.navigate(['/admin/productos/editar-producto', producto.id]);
  }

  // Mostrar mensajes de éxito o error
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

}
