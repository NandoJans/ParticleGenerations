import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPurpleComponent } from './red-purple.component';

describe('RedPurpleComponent', () => {
  let component: RedPurpleComponent;
  let fixture: ComponentFixture<RedPurpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedPurpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedPurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
