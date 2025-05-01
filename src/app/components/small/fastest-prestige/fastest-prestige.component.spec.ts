import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastestPrestigeComponent } from './fastest-prestige.component';

describe('FastestPrestigeComponent', () => {
  let component: FastestPrestigeComponent;
  let fixture: ComponentFixture<FastestPrestigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastestPrestigeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastestPrestigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
