import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurpleGeneratorsComponent } from './purple-generators.component';

describe('PurpleGeneratorsComponent', () => {
  let component: PurpleGeneratorsComponent;
  let fixture: ComponentFixture<PurpleGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurpleGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurpleGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
