import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/modelo/iProducto';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  productoForm: FormGroup;
  plataformas: string[] = [];
  generos: string[] = [];
  imagenURL: string | undefined;  // URL de la imagen actual
  productoId: string | null = null;  // ID del producto a editar

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.min(0)],
      plataforma: ['', Validators.required],
      genero: [[], Validators.required],
      stock: [0, Validators.min(0)],
      recomendado: [false],
      desarrollador: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.productoId = this.route.snapshot.paramMap.get('id');

    if (this.productoId) {
      this.productoService.obtenerProducto(this.productoId).subscribe((producto) => {
        if (producto) {
          this.productoForm.patchValue({
            nombre: producto.nombre,
            precio: producto.precio,
            plataforma: producto.plataforma,
            genero: producto.genero,
            stock: producto.stock,
            recomendado: producto.recomendado,
            desarrollador: producto.desarrollador,
            publisher: producto.publisher
          });
          this.imagenURL = producto.imagen;
        }
      });
    }

    this.productoService.obtenerPlataformas().subscribe((plataformas: any) => {
      this.plataformas = plataformas.map((p: any) => p.nombre);
    });

    this.productoService.obtenerGeneros().subscribe((generos: any) => {
      this.generos = generos.map((g: any) => g.nombre);
    });
  }

  async editarProducto() {
    const producto: Producto = {
      id: this.productoId ?? undefined,
      nombre: this.productoForm.value.nombre,
      precio: this.productoForm.value.precio,
      plataforma: this.productoForm.value.plataforma,
      genero: this.productoForm.value.genero,
      stock: this.productoForm.value.stock,
      recomendado: this.productoForm.value.recomendado,
      desarrollador: this.productoForm.value.desarrollador,
      publisher: this.productoForm.value.publisher,
      imagen: this.imagenURL
    };

    if (producto.id) {
      // Actualizar el producto y verificar desarrollador y publisher
      await this.productoService.verificarYAgregarDesarrollador(producto.desarrollador);
      await this.productoService.verificarYAgregarPublisher(producto.publisher);
      await this.productoService.editarProducto(producto.id, producto);

      this.mostrarToast('Producto modificado exitosamente', 'success');
      this.router.navigate(['admin/productos/listar-producto']);
    } else {
      this.mostrarToast('Error: No se pudo obtener el ID del producto', 'danger');
    }
  }

  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productoService.subirImagen(file).then((url) => {
        this.imagenURL = url;
      });
    }
  }

  volverAdmin() {
    this.router.navigate(['admin/productos/listar-producto']);
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
