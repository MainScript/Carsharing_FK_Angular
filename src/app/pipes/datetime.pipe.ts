import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return `${value.getHours()}:${value.getMinutes()}`;
    }
  }

  transformEnd(value: string | Date, start: string): string {
    if (typeof value === 'string') {
      return value;
    } else {
      const startDate = new Date(`01 Jan 1970 ${start}`);
      const endDate = new Date(startDate.getTime() + (30 * 60000));
      return `${endDate.getHours()}:${endDate.getMinutes()}`;
    }
  }

  timeRangeToMinutes(timeRange: Date[]): number {
    return ((timeRange[1].getTime() - timeRange[0].getTime()) / 1000 / 60);
  }

  timeToUnixTime(time: string): Date {
    return new Date(`01 Jan 1970 ${time}`);
  }

  timeOrNowToUnixTime(time: string | undefined): Date {
    if (typeof time === 'string') {
      return this.timeToUnixTime(time);
    } else {
      const now = new Date();
      return new Date(`01 Jan 1970 ${now.getHours()}:${now.getMinutes()}`);
    }
  }
}
