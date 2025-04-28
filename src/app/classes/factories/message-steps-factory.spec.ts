import { MessageStepsFactory } from './message-steps-factory';

describe('MessageStepsFactory', () => {
  it('should create an instance', () => {
    const style = 'default';
    const icon = 'info';
    expect(new MessageStepsFactory(style, icon)).toBeTruthy();
  });
});
