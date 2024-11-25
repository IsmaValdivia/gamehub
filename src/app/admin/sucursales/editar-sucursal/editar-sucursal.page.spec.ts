import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarSucursalPage } from './editar-sucursal.page';

describe('EditarSucursalPage', () => {
  let component: EditarSucursalPage;
  let fixture: ComponentFixture<EditarSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
