import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAutomatorsComponent } from './blue-automators.component';

describe('BlueAutomatorsComponent', () => {
  let component: BlueAutomatorsComponent;
  let fixture: ComponentFixture<BlueAutomatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueAutomatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueAutomatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
