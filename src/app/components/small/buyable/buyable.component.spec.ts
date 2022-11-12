import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyableComponent } from './buyable.component';

describe('BuyableComponent', () => {
  let component: BuyableComponent;
  let fixture: ComponentFixture<BuyableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
