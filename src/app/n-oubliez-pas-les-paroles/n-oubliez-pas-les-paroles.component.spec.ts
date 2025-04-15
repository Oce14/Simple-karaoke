import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOubliezPasLesParolesComponent } from './n-oubliez-pas-les-paroles.component';

describe('NOubliezPasLesParolesComponent', () => {
  let component: NOubliezPasLesParolesComponent;
  let fixture: ComponentFixture<NOubliezPasLesParolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NOubliezPasLesParolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NOubliezPasLesParolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
