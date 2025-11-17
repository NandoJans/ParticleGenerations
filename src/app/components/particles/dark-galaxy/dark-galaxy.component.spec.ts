import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkGalaxyComponent } from './dark-galaxy.component';

describe('DarkGalaxyComponent', () => {
  let component: DarkGalaxyComponent;
  let fixture: ComponentFixture<DarkGalaxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkGalaxyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
