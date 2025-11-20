import { TimeHelper } from './time-helper';

describe('TimeHelper', () => {
  it('should create an instance', () => {
    expect(new TimeHelper()).toBeTruthy();
  });

  describe('formatDuration', () => {
    it('should format seconds only', () => {
      const result = TimeHelper.formatDuration(5000, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 00:00:05.0000');
    });

    it('should format minutes and seconds', () => {
      const result = TimeHelper.formatDuration(125000, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 00:02:05.0000');
    });

    it('should format hours, minutes and seconds', () => {
      const result = TimeHelper.formatDuration(3725000, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 01:02:05.0000');
    });

    it('should format single day with time', () => {
      const result = TimeHelper.formatDuration(90000000, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 1d 01:00:00.0000');
    });

    it('should format multiple days with time', () => {
      const result = TimeHelper.formatDuration(180000000, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 2d 02:00:00.0000');
    });

    it('should format single year', () => {
      const millisInYear = 365 * 24 * 60 * 60 * 1000;
      const result = TimeHelper.formatDuration(millisInYear, 'yy dd hh:mm:ss.ms');
      expect(result).toBe('1y  00:00:00.0000');
    });

    it('should format single year with days', () => {
      const millisInYear = 365 * 24 * 60 * 60 * 1000;
      const millisInDay = 24 * 60 * 60 * 1000;
      const result = TimeHelper.formatDuration(millisInYear + 5 * millisInDay, 'yy dd hh:mm:ss.ms');
      expect(result).toBe('1y 5d 00:00:00.0000');
    });

    it('should format multiple years and hide insignificant units', () => {
      const millisInYear = 365 * 24 * 60 * 60 * 1000;
      const millisInDay = 24 * 60 * 60 * 1000;
      // 2 years, 5 days, 3 hours, 30 minutes, 45 seconds
      const total = 2 * millisInYear + 5 * millisInDay + 3 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000;
      const result = TimeHelper.formatDuration(total, 'yy dd hh:mm:ss.ms');
      // When multiple years, only show years
      expect(result).toBe('2y');
    });

    it('should handle milliseconds correctly', () => {
      const result = TimeHelper.formatDuration(1234, 'yy dd hh:mm:ss.ms');
      expect(result).toBe(' 00:00:01.0234');
    });

    it('should work with different format strings', () => {
      const result = TimeHelper.formatDuration(3725000, 'hh:mm:ss');
      expect(result).toBe('01:02:05');
    });

    it('should work with format without years placeholder', () => {
      const result = TimeHelper.formatDuration(90000000, 'dd hh:mm:ss.ms');
      expect(result).toBe('1d 01:00:00.0000');
    });

    it('should show only years for 10 years', () => {
      const millisInYear = 365 * 24 * 60 * 60 * 1000;
      const result = TimeHelper.formatDuration(10 * millisInYear, 'yy dd hh:mm:ss.ms');
      expect(result).toBe('10y');
    });
  });
});
