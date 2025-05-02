import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowAutomatorsComponent } from './yellow-automators.component';

describe('YellowAutomatorsComponent', () => {
  let component: YellowAutomatorsComponent;
  let fixture: ComponentFixture<YellowAutomatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowAutomatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowAutomatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
