import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedUpgradesComponent } from './red-upgrades.component';

describe('RedUpgradesComponent', () => {
  let component: RedUpgradesComponent;
  let fixture: ComponentFixture<RedUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedUpgradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
