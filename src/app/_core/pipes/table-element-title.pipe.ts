import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableElementTitle'
})
export class TableElementTitlePipe implements PipeTransform {

  transform(value: any, key: string): unknown {
    if (key === 'staff' && value) {
      return `${value.firstname} ${value.lastname}`;
    }

    if (typeof value !== "object") {
      return value;
    }
    return value?.title || '';
  }

}
