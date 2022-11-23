import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkAgeComponent } from './dark-age.component';

describe('DarkAgeComponent', () => {
  let component: DarkAgeComponent;
  let fixture: ComponentFixture<DarkAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarkAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
