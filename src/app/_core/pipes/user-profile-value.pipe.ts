import { Pipe, PipeTransform } from '@angular/core';
import {PROFILE_DISPLAY_HEADS_NAMES, PROFILE_DISPLAY_PRACTICES, PROFILE_DISPLAY_EXTRA_STACKS} from "../constants/constants";

@Pipe({
  name: 'userProfileValue'
})
export class UserProfileValuePipe implements PipeTransform {

  transform(user: any, field: string, isPractices = false) {
    let data = user?.[field] || user;
    if (!data) {
      return data;
    }

    if (PROFILE_DISPLAY_HEADS_NAMES.includes(field)) {
      data = data ? `${data.firstname} ${data.lastname}` : null;
    } else if (PROFILE_DISPLAY_PRACTICES.includes(field) || isPractices) {
      data = data.title;
    } else if (field == PROFILE_DISPLAY_EXTRA_STACKS) {
      data = data.map((el: { title: string; }) => el.title).join(', ');
    }
    return data;
  }

}
