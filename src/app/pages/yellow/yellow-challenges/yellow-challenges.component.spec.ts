import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowChallengesComponent } from './yellow-challenges.component';

describe('YellowChallengesComponent', () => {
  let component: YellowChallengesComponent;
  let fixture: ComponentFixture<YellowChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
