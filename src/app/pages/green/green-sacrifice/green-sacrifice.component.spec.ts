import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenSacrificeComponent } from './green-sacrifice.component';

describe('GreenSacrificeComponent', () => {
  let component: GreenSacrificeComponent;
  let fixture: ComponentFixture<GreenSacrificeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenSacrificeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenSacrificeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
