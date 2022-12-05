import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutronStarsComponent } from './neutron-stars.component';

describe('NeutronStarsComponent', () => {
  let component: NeutronStarsComponent;
  let fixture: ComponentFixture<NeutronStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeutronStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeutronStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
