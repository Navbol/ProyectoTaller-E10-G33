import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPropietariosComponent } from './crud-propietarios.component';

describe('CrudPropietariosComponent', () => {
  let component: CrudPropietariosComponent;
  let fixture: ComponentFixture<CrudPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPropietariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
