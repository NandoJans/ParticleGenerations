import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerTestComponent } from './charger-test.component';

describe('ChargerTestComponent', () => {
  let component: ChargerTestComponent;
  let fixture: ComponentFixture<ChargerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargerTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
