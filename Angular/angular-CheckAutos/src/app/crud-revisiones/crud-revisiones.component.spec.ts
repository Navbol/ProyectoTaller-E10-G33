import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRevisionesComponent } from './crud-revisiones.component';

describe('CrudRevisionesComponent', () => {
  let component: CrudRevisionesComponent;
  let fixture: ComponentFixture<CrudRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRevisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
