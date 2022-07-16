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
}
