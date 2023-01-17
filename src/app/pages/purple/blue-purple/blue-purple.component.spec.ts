import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluePurpleComponent } from './blue-purple.component';

describe('BluePurpleComponent', () => {
  let component: BluePurpleComponent;
  let fixture: ComponentFixture<BluePurpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluePurpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BluePurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
