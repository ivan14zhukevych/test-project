import { Pipe, PipeTransform } from '@angular/core';
import {GoalFieldsEnum} from "../enums/goal-fields.enum";

@Pipe({
  name: 'goalFields'
})
export class GoalFieldsPipe implements PipeTransform {

  transform(data: any, field?: string) {
    if (field === 'status') {
      data = (GoalFieldsEnum as any)[data] || data;
    }
    return data;
  }

}
