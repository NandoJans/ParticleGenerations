import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowUpgradesComponent } from './yellow-upgrades.component';

describe('YellowUpgradesComponent', () => {
  let component: YellowUpgradesComponent;
  let fixture: ComponentFixture<YellowUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowUpgradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
