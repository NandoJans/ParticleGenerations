import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenAutomatorsPageComponent } from './green-automators-page.component';

describe('GreenAutomatorsPageComponent', () => {
  let component: GreenAutomatorsPageComponent;
  let fixture: ComponentFixture<GreenAutomatorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenAutomatorsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenAutomatorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
