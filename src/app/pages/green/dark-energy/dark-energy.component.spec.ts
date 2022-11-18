import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkEnergyComponent } from './dark-energy.component';

describe('DarkEnergyComponent', () => {
  let component: DarkEnergyComponent;
  let fixture: ComponentFixture<DarkEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarkEnergyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
