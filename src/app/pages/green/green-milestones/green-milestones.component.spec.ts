import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenMilestonesComponent } from './green-milestones.component';

describe('GreenMilestonesComponent', () => {
  let component: GreenMilestonesComponent;
  let fixture: ComponentFixture<GreenMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenMilestonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
