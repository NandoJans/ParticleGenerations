import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyTreeComponent } from './galaxy-tree.component';

describe('GalaxyTreeComponent', () => {
  let component: GalaxyTreeComponent;
  let fixture: ComponentFixture<GalaxyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaxyTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaxyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
