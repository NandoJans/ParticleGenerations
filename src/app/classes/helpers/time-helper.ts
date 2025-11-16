export class TimeHelper {
  static formatDuration(milliseconds: number, format: string): string {
    const total = Math.floor(milliseconds / 1000);

    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    let dd: string;
    if (days === 1) dd = "1d";
    else if (days > 1) dd = `${days}d`;
    else dd = "";

    let hh = hours.toString().padStart(2, "0");
    let mm = minutes.toString().padStart(2, "0");
    let ss = secs.toString().padStart(2, "0");
    let ms = Math.floor((milliseconds / 1000 - total) * 1000).toString().padStart(4, "0");

    return format
      .replace("dd", dd)
      .replace("hh", hh)
      .replace("mm", mm)
      .replace("ss", ss)
      .replace("ms", ms);
  }
}
