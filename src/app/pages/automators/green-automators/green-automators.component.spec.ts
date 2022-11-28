import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenAutomatorsComponent } from './green-automators.component';

describe('GreenAutomatorsComponent', () => {
  let component: GreenAutomatorsComponent;
  let fixture: ComponentFixture<GreenAutomatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenAutomatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenAutomatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
