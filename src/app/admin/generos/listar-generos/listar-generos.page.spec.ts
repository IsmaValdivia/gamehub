import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarGenerosPage } from './listar-generos.page';

describe('ListarGenerosPage', () => {
  let component: ListarGenerosPage;
  let fixture: ComponentFixture<ListarGenerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarGenerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
