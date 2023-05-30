import { ProfileFieldsEnum } from "../enums/profile-fields-title.enum";

export class UserHelper {
  static getFieldTitle(title: string | any) {
    return (ProfileFieldsEnum as any)[title] || title;
  }
}
