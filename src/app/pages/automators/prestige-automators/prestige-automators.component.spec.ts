import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestigeAutomatorsComponent } from './prestige-automators.component';

describe('PrestigeAutomatorsComponent', () => {
  let component: PrestigeAutomatorsComponent;
  let fixture: ComponentFixture<PrestigeAutomatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestigeAutomatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestigeAutomatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
