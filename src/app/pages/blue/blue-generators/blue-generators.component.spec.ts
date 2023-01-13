import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueGeneratorsComponent } from './blue-generators.component';

describe('BlueGeneratorsComponent', () => {
  let component: BlueGeneratorsComponent;
  let fixture: ComponentFixture<BlueGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
