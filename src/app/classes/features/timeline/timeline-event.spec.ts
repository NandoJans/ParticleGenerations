import { TimelineEvent } from './timeline-event';

describe('TimelineEvent', () => {
  it('should create an instance', () => {
    const mockData = { id: 1, name: 'Test Event', timestamp: new Date() }; // Replace with actual parameter structure
    expect(new TimelineEvent(mockData.id, mockData.name, mockData.timestamp)).toBeTruthy();
  });
});
