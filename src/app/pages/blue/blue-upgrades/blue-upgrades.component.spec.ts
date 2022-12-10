import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueUpgradesComponent } from './blue-upgrades.component';

describe('BlueUpgradesComponent', () => {
  let component: BlueUpgradesComponent;
  let fixture: ComponentFixture<BlueUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueUpgradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
