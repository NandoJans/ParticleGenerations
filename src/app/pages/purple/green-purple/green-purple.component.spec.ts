import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenPurpleComponent } from './green-purple.component';

describe('GreenPurpleComponent', () => {
  let component: GreenPurpleComponent;
  let fixture: ComponentFixture<GreenPurpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenPurpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenPurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
