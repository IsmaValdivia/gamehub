import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescuentosPage } from './descuentos.page';

describe('DescuentosPage', () => {
  let component: DescuentosPage;
  let fixture: ComponentFixture<DescuentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
