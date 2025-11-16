export class TimeHelper {
  static formatDuration(seconds: number, format: string): string {
    const total = Math.floor(seconds);

    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    const dd = days.toString().padStart(2, "0");
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = secs.toString().padStart(2, "0");
    const SSS = (seconds % 1).toFixed(3).slice(1);

    return format
      .replace("dd", dd)
      .replace("hh", hh)
      .replace("mm", mm)
      .replace("ss", ss)
      .replace("SSS", SSS);
  }
}
