import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPlataformaPage } from './agregar-plataforma.page';

describe('AgregarPlataformaPage', () => {
  let component: AgregarPlataformaPage;
  let fixture: ComponentFixture<AgregarPlataformaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPlataformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
