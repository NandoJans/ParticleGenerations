import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowFusionComponent } from './yellow-fusion.component';

describe('YellowFusionComponent', () => {
  let component: YellowFusionComponent;
  let fixture: ComponentFixture<YellowFusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowFusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
