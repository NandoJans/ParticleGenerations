import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowStarKeysPageComponent } from './yellow-star-keys-page.component';

describe('YellowStarKeysPageComponent', () => {
  let component: YellowStarKeysPageComponent;
  let fixture: ComponentFixture<YellowStarKeysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YellowStarKeysPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowStarKeysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
