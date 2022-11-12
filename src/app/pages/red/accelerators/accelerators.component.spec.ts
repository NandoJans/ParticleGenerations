import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceleratorsComponent } from './accelerators.component';

describe('AcceleratorsComponent', () => {
  let component: AcceleratorsComponent;
  let fixture: ComponentFixture<AcceleratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceleratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceleratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
