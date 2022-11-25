import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuclearDecayComponent } from './nuclear-decay.component';

describe('NuclearDecayComponent', () => {
  let component: NuclearDecayComponent;
  let fixture: ComponentFixture<NuclearDecayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuclearDecayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuclearDecayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
