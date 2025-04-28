import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStepsComponent } from './message-steps.component';

describe('MessageStepsComponent', () => {
  let component: MessageStepsComponent;
  let fixture: ComponentFixture<MessageStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
