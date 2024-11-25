import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarSucursalPage } from './agregar-sucursal.page';

describe('AgregarSucursalPage', () => {
  let component: AgregarSucursalPage;
  let fixture: ComponentFixture<AgregarSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
