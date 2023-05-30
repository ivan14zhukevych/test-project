import { UserRoles } from '../enums/user-roles.enum';

export interface Sidenav {
  name: string;
  link: string;
  icon: string;
  role: UserRoles | UserRoles[];
  hasDropdown: boolean;
}
