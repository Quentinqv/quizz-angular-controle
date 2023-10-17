import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToSeconds'
})
export class DateToSecondsPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    // value is the start Date and args[0] is the end Date
    if (!args[0]) args[0] = new Date();

    const startDate = value;
    const endDate = args[0] as Date;
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    return seconds;
  }

}
