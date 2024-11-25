import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { Producto } from 'src/app/modelo/iProducto';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  productoForm: FormGroup;
  plataformas: string[] = [];
  generos: string[] = [];
  imagenURL: string = '';  // Define la propiedad imagenURL
  imagenSubida: boolean = false;  // Bandera para verificar si la imagen fue subida

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private toastController: ToastController,
    private storage: AngularFireStorage,
    private navCtrl: NavController,
    private router: Router
  ) {
    // Inicialización del formulario
    this.productoForm = this.formBuilder.group({
      nombre: [''], 
      precio: [0],  
      plataforma: [''], 
      genero: [[]],  
      stock: [0], 
      recomendado: [false],
      descuento: [null], 
      desarrollador: [''], 
      publisher: [''],
      imagen: [null] 
    });
  }

  ngOnInit() {
    // Cargar plataformas y géneros desde Firebase
    this.productoService.obtenerPlataformas().subscribe(plataformas => {
      this.plataformas = plataformas.map((p: any) => p.nombre);
    });
    this.productoService.obtenerGeneros().subscribe(generos => {
      this.generos = generos.map((g: any) => g.nombre);
    });
  }

  // Método para subir la imagen a Firebase
  subirImagen(event: any) {
    const archivo = event.target.files[0];
    const filePath = `juegos/${Date.now()}_${archivo.name}`;
    const fileRef = this.storage.ref(filePath);
    const tareaSubida = this.storage.upload(filePath, archivo);

    tareaSubida.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imagenURL = url;  // Aquí obtenemos la URL de la imagen subida
          this.imagenSubida = true;  // Indicamos que la imagen ha sido subida
        });
      })
    ).subscribe();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productoForm.patchValue({
        imagen: file
      });
    }
  }

  async agregarProducto() {
    const producto: Omit<Producto, 'id'> = {
      nombre: this.productoForm.value.nombre,
      precio: this.productoForm.value.precio,
      plataforma: this.productoForm.value.plataforma,
      genero: this.productoForm.value.genero,
      stock: this.productoForm.value.stock,
      recomendado: this.productoForm.value.recomendado,
      descuento: this.productoForm.value.descuento,
      desarrollador: this.productoForm.value.desarrollador,
      publisher: this.productoForm.value.publisher,
      imagen: this.imagenURL
    };

    try {
      await this.productoService.agregarProductoConDetalles(producto);
      this.mostrarToast('Producto agregado con éxito', 'success');
      this.productoForm.reset();
      this.navCtrl.navigateBack('/admin/productos/listar-producto');
    } catch (error) {
      this.mostrarToast('Error al agregar el producto', 'danger');
      console.error('Error al agregar el producto: ', error);
    }
  }

  // Método para mostrar mensajes de Toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  volverAdmin(){
    this.router.navigate(['admin/productos/listar-producto'])
  }
}
