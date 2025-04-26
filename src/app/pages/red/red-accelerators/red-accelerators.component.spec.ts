import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedAcceleratorsComponent } from './red-accelerators.component';

describe('RedAcceleratorsComponent', () => {
  let component: RedAcceleratorsComponent;
  let fixture: ComponentFixture<RedAcceleratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedAcceleratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedAcceleratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
