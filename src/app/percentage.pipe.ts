import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return (value * 100).toFixed(3) + "%";
  }

}