import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowPurpleComponent } from './yellow-purple.component';

describe('YellowPurpleComponent', () => {
  let component: YellowPurpleComponent;
  let fixture: ComponentFixture<YellowPurpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowPurpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowPurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
