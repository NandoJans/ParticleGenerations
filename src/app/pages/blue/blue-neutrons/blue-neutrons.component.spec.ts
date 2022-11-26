import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueNeutronsComponent } from './blue-neutrons.component';

describe('BlueNeutronsComponent', () => {
  let component: BlueNeutronsComponent;
  let fixture: ComponentFixture<BlueNeutronsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueNeutronsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueNeutronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
