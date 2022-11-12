import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestigeButtonComponent } from './prestige-button.component';

describe('PrestigeButtonComponent', () => {
  let component: PrestigeButtonComponent;
  let fixture: ComponentFixture<PrestigeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestigeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestigeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
