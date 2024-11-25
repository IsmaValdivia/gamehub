import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showBackButton: boolean = false; // input para controlar el botón de volver
  @Input() title: string = '';
  totalProductos: number = 0;

  constructor(
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.carritoService.getCarrito().subscribe(items => {
      this.totalProductos = items.reduce((sum, item) => sum + item.cantidad, 0);
    });
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']); // Navega a la página del carrito
  }

  goBack() {
    // Verifica la ruta actual y decide a dónde navegar
    const currentRoute = this.router.url;

    if (currentRoute === '/carrito') {
      this.router.navigate(['/tabs/tienda']); // Navega a la pestaña de tienda
    } else {
      this.router.navigate(['../']); // Regresa a la ruta anterior si no es un caso especial
    }
  }
}
