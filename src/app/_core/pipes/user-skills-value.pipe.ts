import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'userSkillsValue'
})

export class UserSkillsValuePipe implements PipeTransform {
  transform(skills: any, field: string) {
    return skills[field].title;
  }
}
