import { TestBed } from '@angular/core/testing';

import { ProductoCarritoService } from './producto-carrito.service';

describe('ProductoCarritoService', () => {
  let service: ProductoCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
