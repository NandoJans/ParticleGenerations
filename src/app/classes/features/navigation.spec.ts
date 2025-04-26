import { Navigation } from './navigation';

describe('Navigation', () => {
  it('should create an instance', () => {
    const mockRoute = '/home';
    const mockOptions = { enableLogging: true };
    expect(new Navigation(mockRoute, mockOptions)).toBeTruthy();
  });
});
