import { Timeline } from './timeline';

describe('Timeline', () => {
  it('should create an instance', () => {
    const name = 'Test Name';
    const style = 'Test Style';
    const title = 'Test Title';
    const message = 'Test Message';
    expect(new Timeline(name, style, title, message)).toBeTruthy();
  });
});
