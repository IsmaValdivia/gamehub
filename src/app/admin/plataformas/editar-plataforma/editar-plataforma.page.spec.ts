import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPlataformaPage } from './editar-plataforma.page';

describe('EditarPlataformaPage', () => {
  let component: EditarPlataformaPage;
  let fixture: ComponentFixture<EditarPlataformaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlataformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
