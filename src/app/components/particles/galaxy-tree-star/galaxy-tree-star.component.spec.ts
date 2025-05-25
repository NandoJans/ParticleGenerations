import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyTreeStarComponent } from './galaxy-tree-star.component';

describe('GalaxyTreeStarComponent', () => {
  let component: GalaxyTreeStarComponent;
  let fixture: ComponentFixture<GalaxyTreeStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaxyTreeStarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaxyTreeStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
