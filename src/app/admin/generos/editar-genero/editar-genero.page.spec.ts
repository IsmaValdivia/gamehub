import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarGeneroPage } from './editar-genero.page';

describe('EditarGeneroPage', () => {
  let component: EditarGeneroPage;
  let fixture: ComponentFixture<EditarGeneroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGeneroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
