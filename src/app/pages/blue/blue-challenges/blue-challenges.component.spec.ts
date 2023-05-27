import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueChallengesComponent } from './blue-challenges.component';

describe('BlueChallengesComponent', () => {
  let component: BlueChallengesComponent;
  let fixture: ComponentFixture<BlueChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
