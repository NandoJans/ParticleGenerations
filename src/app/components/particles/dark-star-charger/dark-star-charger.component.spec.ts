import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkStarChargerComponent } from './dark-star-charger.component';

describe('DarkStarChargerComponent', () => {
  let component: DarkStarChargerComponent;
  let fixture: ComponentFixture<DarkStarChargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkStarChargerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkStarChargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
