import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenGeneratorsComponent } from './green-generators.component';

describe('GreenGeneratorsComponent', () => {
  let component: GreenGeneratorsComponent;
  let fixture: ComponentFixture<GreenGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
