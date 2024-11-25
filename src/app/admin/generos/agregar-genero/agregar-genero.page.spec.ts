import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarGeneroPage } from './agregar-genero.page';

describe('AgregarGeneroPage', () => {
  let component: AgregarGeneroPage;
  let fixture: ComponentFixture<AgregarGeneroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGeneroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
