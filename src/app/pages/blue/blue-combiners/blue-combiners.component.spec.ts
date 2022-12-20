import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueCombinersComponent } from './blue-combiners.component';

describe('BlueCombinersComponent', () => {
  let component: BlueCombinersComponent;
  let fixture: ComponentFixture<BlueCombinersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueCombinersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueCombinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
