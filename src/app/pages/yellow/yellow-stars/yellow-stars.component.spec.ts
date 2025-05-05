import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowStarsComponent } from './yellow-stars.component';

describe('YellowStarsComponent', () => {
  let component: YellowStarsComponent;
  let fixture: ComponentFixture<YellowStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
