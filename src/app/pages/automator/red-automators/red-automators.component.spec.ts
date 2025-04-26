import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedAutomatorsComponent } from './red-automators.component';

describe('RedAutomatorsComponent', () => {
  let component: RedAutomatorsComponent;
  let fixture: ComponentFixture<RedAutomatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedAutomatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedAutomatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
