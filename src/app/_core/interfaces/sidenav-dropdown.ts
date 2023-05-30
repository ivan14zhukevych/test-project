import { UserRoles } from "../enums/user-roles.enum";

export interface SidenavDropdown {
  name: string;
  link: string;
  icon: string;
  role: UserRoles;
  hasDropdown: boolean;
}
