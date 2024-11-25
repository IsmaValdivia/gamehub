import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPlataformasPage } from './listar-plataformas.page';

describe('ListarPlataformasPage', () => {
  let component: ListarPlataformasPage;
  let fixture: ComponentFixture<ListarPlataformasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlataformasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
