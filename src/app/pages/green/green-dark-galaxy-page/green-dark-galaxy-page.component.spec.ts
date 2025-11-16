import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenDarkGalaxyPageComponent } from './green-dark-galaxy-page.component';

describe('GreenDarkGalaxyPageComponent', () => {
  let component: GreenDarkGalaxyPageComponent;
  let fixture: ComponentFixture<GreenDarkGalaxyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenDarkGalaxyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenDarkGalaxyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
