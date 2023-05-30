import { environment } from 'src/environments/environment';
import { UserRoles } from '../enums/user-roles.enum';

export const SIGN_IN_URL = environment.apiUrl + '/auth/sign-in';
export const SIGN_UP_URL = environment.apiUrl + '/auth/sign-up';
export const FORGOT_PASSWORD_URL = environment.apiUrl + '/auth/forgot-password';
export const UPDATE_PASSWORD_URL = environment.apiUrl + '/auth/update-password';
export const USER_ME_URL = environment.apiUrl + '/user/me';
export const ADMIN_USERS = environment.apiUrl + '/admin/users';
export const ADMIN_USER_BY_ID = environment.apiUrl + '/admin/user';
export const ESSENCE_URL = environment.apiUrl + '/user/essence';
export const GET_MENTORS_URL =
  environment.apiUrl + '/staff/mentor/all/short-info';
export const GET_MANAGERS_URL =
  environment.apiUrl + '/staff/manager/all/short-info';

export const STAFF_MANAGER = environment.apiUrl + '/staff/staff_user/manager';
export const STAFF_MENTOR = environment.apiUrl + '/staff/staff_user/mentor';
export const NOTIFICATION_ALL = environment.apiUrl + '/notification/all'
export const NOTIFICATION_READ_ALL = environment.apiUrl + '/notification/read-all'

export const PASSWORD_REGEXP = /((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,}/;
export const NAME_REGEXP = /^[A-Za-z]+([A-Za-z]+)$/;
export const NO_SPECIAL_CHARACTERS_REGEXP = /^[a-zA-Z0-9.]*$/;
export const EMAIL_REGEXP = /^\S+@\S+\.\S+/;

export const SUCCESS_MESSAGE = {
  login: 'Login successful',
  register:
    'To confirm the registration, follow the link that was sent to your e-mail',
  resetPassword: 'Password reset successful, you can now login',
  forgotPassword: 'Email is verified successfully',
  changeUserNames: 'User data has been updated',
};

export const ERROR_MESSAGE = {
  access: 'Access denied',
  isLoggedIn: "You're already logged in",
  priorityTableElement: 'Priority lower then "1" or already exist',
};

export const WARNING_MESSAGE = {
  existedId: "Such 'id' already exist",
  createTableElement: 'Please, fill in all fields to save',
};

export const TOASTR_CONFIG = {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
  includeTitleDuplicates: true,
  maxOpened: 7,
  newestOnTop: false,
  closeButton: true,
};

export const USERS_LIST_COMPONENT_STRINGS = {
  extraStacks: 'extraStacks',
  stack: 'stack',
  softSkills: 'softSkills',
  boolean: 'boolean',
  filtered: 'filtered',
};

export const ROLES_FIELDS = ['isAdmin', 'isMentor', 'isManager'];

export const SIDENAV_ITEMS = [
  {
    name: 'Dashboard',
    link: '/',
    icon: 'dashboard',
    role: UserRoles.Employee,
    hasDropdown: false
  },
  {
    name: 'Skills',
    link: '/skills',
    icon: 'checklist_rtl',
    role: UserRoles.Employee,
    hasDropdown: true
  },
  {
    name: 'Levels',
    link: '/levels',
    icon: 'list',
    role: UserRoles.Employee,
    hasDropdown: false
  },
  {
    name: 'Users List',
    link: '/users-list',
    icon: 'admin_panel_settings',
    role: [UserRoles.Admin, UserRoles.Mentor, UserRoles.Manager],
    hasDropdown: false
  },

];



export const SIDENAV_DROPDOWN =[

      {
        name: 'English-level',
        link: '/english-levels',
        icon: 'language',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'Influences',
        link: '/influences',
        icon: 'emoji_objects',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'People',
        link: '/people',
        icon: 'supervisor_account',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'Performance levels',
        link: '/performance-levels',
        icon: 'moving',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'Soft Skills',
        link: '/softskills',
        icon: 'psychology',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'Systems',
        link: '/systems',
        icon: 'miscellaneous_services',
        role: UserRoles.Employee,
        hasDropdown: false
      },
      {
        name: 'Technologies',
        link: '/technologies',
        icon: 'devices',
        role: UserRoles.Employee,
        hasDropdown: false
      },
]

export const LEVEL_LIST_FIELDS: string[] = [
  'englishLevel',
  'influence',
  'people',
  'performanceLevel',
  'softSkills',
  'system',
  'technology',
];

export const DOWNLOAD_LEVEL_LIST_FIELDS: string[] = [
  'english_level',
  'influence',
  'people',
  'performance_level',
  'soft_skill',
  'system_level',
  'technology',
];

export const DASHBOARD_SETTINGS = {
  fill: true,
  backgroundColor: 'rgb(242,123,25, 0.2)',
  borderColor: 'rgba(242,123,25)',
  pointBackgroundColor: 'rgb(242,123,25)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(242,123,25)',
};

export const DASHBOARD_SETTINGS_1 = {
  fill: true,
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgb(54, 162, 235)',
  pointBackgroundColor: 'rgb(54, 162, 235)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(54, 162, 235)',
};

export const RADAR_OPTIONS = {
  legend: {
    labels: {
      fontSize: 16,
      padding: 30,
    },
    position: 'bottom',
  },
  title: {
    display: true,
    text: 'Competence Matrix Chart',
    fontSize: 20,
  },
  scale: {
    pointLabels: {
      fontSize: 16,
    },
    ticks: {
      suggestedMin: 0,
      suggestedMax: 5,
      stepSize: 1,
      z: 1,
      showLabelBackdrop: false,
    },
  },
};

export const TABLE_KEYS_OBJECT_USER = {
  title: {
    key: 'Title',
  },
  description: {
    key: 'Description',
  },
};

export const TABLE_KEYS_OBJECT_ADMIN = {
  title: {
    key: 'Title',
    keyType: 'text',
  },
  description: {
    key: 'Description',
    keyType: 'text',
  },
  isActive: {
    key: 'Active',
    keyType: 'boolean',
  },
  priority: {
    key: 'Priority',
    keyType: 'number',
  },
};

export const PROFILE_DISPLAY_FIELDS = [
  'email',
  'mentor',
  'manager',
  'stack',
  'extraStacks',
  'level',
];
export const PROFILE_DISPLAY_BUTTONS = ['skills', 'goals', 'previousGoals'];
export const PROFILE_DISPLAY_HEADS_NAMES = ['mentor', 'manager'];
export const PROFILE_DISPLAY_PRACTICES = ['stack', 'level'];
export const PROFILE_DISPLAY_EXTRA_STACKS = 'extraStacks';

export const PROFILE_FIELDS_TYPES = {
  string: ['email'],
  dropdown: ['mentor', 'manager', 'stack', 'level'],
  select: ['extraStacks']
}
