import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowGeneratorsComponent } from './yellow-generators.component';

describe('YellowGeneratorsComponent', () => {
  let component: YellowGeneratorsComponent;
  let fixture: ComponentFixture<YellowGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
