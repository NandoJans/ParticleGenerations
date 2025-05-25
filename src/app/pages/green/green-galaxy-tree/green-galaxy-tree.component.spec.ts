import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenGalaxyTreeComponent } from './green-galaxy-tree.component';

describe('GreenGalaxyTreeComponent', () => {
  let component: GreenGalaxyTreeComponent;
  let fixture: ComponentFixture<GreenGalaxyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenGalaxyTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenGalaxyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
