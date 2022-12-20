import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinerBoxComponent } from './combiner-box.component';

describe('CombinerBoxComponent', () => {
  let component: CombinerBoxComponent;
  let fixture: ComponentFixture<CombinerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinerBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
