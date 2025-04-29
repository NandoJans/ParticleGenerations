import { TimelineFactory } from './timeline-factory';

describe('TimelineFactory', () => {
  it('should create an instance', () => {
    const name = 'TestName';
    const style = 'TestStyle';
    const title = 'TestTitle';
    const message = 'TestMessage';
    expect(new TimelineFactory(name, style, title, message)).toBeTruthy();
  });
});
