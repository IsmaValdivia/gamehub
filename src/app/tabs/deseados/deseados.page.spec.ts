import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeseadosPage } from './deseados.page';

describe('DeseadosPage', () => {
  let component: DeseadosPage;
  let fixture: ComponentFixture<DeseadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeseadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
