import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineComponent } from './offline.component';

describe('OfflineComponent', () => {
  let component: OfflineComponent;
  let fixture: ComponentFixture<OfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have autoFullscreenEnabled as true by default', () => {
    expect(component.autoFullscreenEnabled).toBe(true);
  });

  it('should toggle autoFullscreenEnabled when toggleAutoFullscreen is called', () => {
    const initialValue = component.autoFullscreenEnabled;
    component.toggleAutoFullscreen();
    expect(component.autoFullscreenEnabled).toBe(!initialValue);
  });
});
