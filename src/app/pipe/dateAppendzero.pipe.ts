import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAppendzero'
})
export class DateAppendzeroPipe implements PipeTransform {

  transform(value: any): any {
    return value + '000';
  }

}