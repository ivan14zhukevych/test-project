import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

import { UserService } from '../../../_core/services/users/users.service';
import { UserForAdmin } from '../../../_core/models/user-for-admin.model';
import { Level } from 'src/app/_core/models/level.model';
import { Stack } from 'src/app/_core/interfaces/stack.interface';
import { MetricsService } from '../../../_core/services/global/metrics.service';
import { BaseSkills } from '../../../_core/models/base-skills.model';
import { User } from 'src/app/_core/models/user.model';
import { UserRoles } from 'src/app/_core/enums/user-roles.enum';
import { Router } from '@angular/router';

import {ROLES_FIELDS, USERS_LIST_COMPONENT_STRINGS} from "../../../_core/constants/constants";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  user: User;
  users: UserForAdmin[];
  userRoles: UserRoles;

  filteredUsers: UserForAdmin[];
  filteredLevels: Level[];
  filteredStacks: Stack[];
  filteredEnglishLevels: BaseSkills[];
  filteredInfluences: BaseSkills[];
  filteredPeoples: BaseSkills[];
  filteredPerformanceLevels: BaseSkills[];
  filteredSoftSkills: BaseSkills[];
  filteredSystems: BaseSkills[];
  filteredTechnologys: BaseSkills[];

  levels: Level[];
  stacks: Stack[];
  activeLevels: Level[];
  activeStacks: Stack[];
  booleanOptions: any[];
  filters: Array<{ [key: string]: Array<any> }> = [];
  subscription: Subscription = new Subscription();

  filtersForm: FormGroup;
  levelForm: FormGroup;
  stackForm: FormGroup;
  englishLevelForm: FormGroup;
  influenceForm: FormGroup;
  peopleForm: FormGroup;
  performanceLevelForm: FormGroup;
  softSkillForm: FormGroup;
  systemForm: FormGroup;
  technologyForm: FormGroup;

  usersTableKeys: any;
  skills: any;

  mentorsList: any[];
  managersList: any[];

  roles = [
    {
      key: 'Admin',
      value :'isAdmin',
    },
    {
      key: 'Mentor',
      value :'isMentor',
    },
    {
      key: 'Manager',
      value :'isManager',
    }
    ];


  constructor(
    private userService: UserService,
    private metricsService: MetricsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.userSubject.subscribe((user) => (this.user = user))
    )
    this.initializeValues();
    this.initializeForms();

    this.getAllMentors();
    this.getAllManagers();
  }

  private initializeForms(): void {
    this.filtersForm = this.fb.group({
      mentor: [null],
      manager: [null],
      role: [null]
    });

    this.levelForm = this.fb.group({
      level: [null],
    });

    this.stackForm = this.fb.group({
      stack: [null],
    });

    this.englishLevelForm = this.fb.group({
      englishLevel: [null],
    });

    this.influenceForm = this.fb.group({
      influence: [null],
    });

    this.peopleForm = this.fb.group({
      people: [null],
    });

    this.performanceLevelForm = this.fb.group({
      performanceLevel: [null],
    });

    this.softSkillForm = this.fb.group({
      softSkills: [null],
    });

    this.systemForm = this.fb.group({
      system: [null],
    });

    this.technologyForm = this.fb.group({
      technology: [null],
    });
  }

  getAllMentors(){
    this.userService.getMentors().subscribe((data:any)=>
    this.mentorsList = data)
  }

  getAllManagers(){
    this.userService.getManagers().subscribe((data:any)=>
    this.managersList = data)
  }

  onEdit(row: any): void {
    const userForUpdate = { ...row };
    this.router.navigate(['/profile'], { queryParams: { id: userForUpdate.id } })
  }

  filterUsers(): void {
    let usersForFilter = [...this.users];
    this.filters.forEach((filter: any) => {
      const key = Object.keys(filter)[0];
      usersForFilter = usersForFilter.filter((element: any) => {
        let match = false;
        if (key === USERS_LIST_COMPONENT_STRINGS.stack) {
          const extraStacks = element.extraStacks.map((stack: any) => stack.title);
          //console.log(filter[key]);
          filter[key].forEach((stack: any) => { match = !!extraStacks.includes(stack) })
        }
        return (
          match ||
          filter[key].includes(element[key]) ||
          filter[key].includes(element[key]?.title) ||
          filter[key].includes(element[key]?.id)
        );
      });
    });
    this.filteredUsers = usersForFilter;
  }

  clearRolesFilter() {
    this.filters = this.filters.filter(filter => !ROLES_FIELDS.includes(Object.keys(filter)?.[0]));
  }

  setFilter(filter: string, value: any, isResetCurrentFilter?: boolean): void {
    if (this.filters.length === 0 && filter !== 'role') {
      if (value !== null) {
        this.filters.push({ [filter]: [value] });
      }
    } else if (filter === 'role') {
      this.clearRolesFilter();
    } else {
      let filterIndex = this.filters.findIndex((element: any) =>
        element.hasOwnProperty(filter)
      );

      if (ROLES_FIELDS.includes(filter)) {
        this.clearRolesFilter();
      }

      if (isResetCurrentFilter && filterIndex !== -1) {
        this.filters.splice(filterIndex, 1);
        filterIndex = -1;
      }

      if (filterIndex !== -1) {
        if (value === null) {
          this.filters.splice(filterIndex, 1);
        } else {
          let filterValues = this.filters[filterIndex][filter];
          let filterValueIndex = filterValues.indexOf(value);
          if (filterValueIndex !== -1) {
            if (filterValues.length === 1) {
              this.filters.splice(filterIndex, 1);
            } else {
              filterValues.splice(filterValueIndex, 1);
            }
          } else {
            if (typeof value === USERS_LIST_COMPONENT_STRINGS.boolean) {
              filterValues[0] = value;
            } else {
              filterValues.push(value);
            }
          }
        }
      } else {
        this.filters.push({ [filter]: [value] });
      }
    }

    if (this.filters.length) {
      this.filterUsers();
    } else {
      this.filteredUsers = this.users;
    }
  }

  resetFilters(): void {
    this.filters = [];
    this.stackForm.reset();
    this.levelForm.reset();
    this.englishLevelForm.reset();
    this.influenceForm.reset();
    this.peopleForm.reset();
    this.performanceLevelForm.reset();
    this.softSkillForm.reset();
    this.systemForm.reset();
    this.technologyForm.reset();
    this.filtersForm.reset();
    this.filterUsers();
  }

  private initializeValues(): void {
    this.booleanOptions = [
      { title: 'Yes', value: true },
      { title: 'No', value: false },
    ];

    this.subscription.add(
      combineLatest([
        this.metricsService.getLevelsList(),
        this.metricsService.getActiveLevelsList(),
        this.metricsService.getStacks(),
        this.metricsService.getActiveStacks(),
        this.userService.getAllUsers(),
      ]).subscribe(
        ([
          sourceLevels,
          sourceActiveLevels,
          sourceStacks,
          sourceActiveStacks,
          sourceUsersArray,
        ]) => {
          console.log(sourceUsersArray);
          this.levels = sourceLevels;
          this.stacks = sourceStacks;
          this.activeLevels = sourceActiveLevels;
          this.activeStacks = sourceActiveStacks;

          this.changeUsersValuesFromObjectsToStrings(sourceUsersArray);
          this.getSkills();
          this.initializeTableKeys();

          this.setSkillsForDropdownFilters('level');
          this.setSkillsForDropdownFilters('stack');
          this.setSkillsForDropdownFilters('englishLevel');
          this.setSkillsForDropdownFilters('influence');
          this.setSkillsForDropdownFilters('people');
          this.setSkillsForDropdownFilters('performanceLevel');
          this.setSkillsForDropdownFilters('softSkills');
          this.setSkillsForDropdownFilters('system');
          this.setSkillsForDropdownFilters('technology');
        }
      )
    );
  }

  changeUsersValuesFromObjectsToStrings(sourceUsersArray: UserForAdmin[]) {
    const usersValuesChangedToStrings = sourceUsersArray.map(
      (user: UserForAdmin) => {
        const userValuesToStrings: UserForAdmin = Object.assign({ ...user });
        Object.entries(userValuesToStrings).forEach((item) => {
          (userValuesToStrings as any)[item[0]] = item[1]?.title || item[1];
        });
        return userValuesToStrings;
      }
    );
    this.users = usersValuesChangedToStrings;
    this.filteredUsers = usersValuesChangedToStrings;
  }

  getSkills(): void {
    this.metricsService.skillsSubject.subscribe((data) => {
      this.skills = data;
    });
  }

  private initializeTableKeys(): void {
    this.usersTableKeys = {
      email: {
        key: 'Email',
        keyType: 'text',
      },
      firstname: {
        key: 'name',
        keyType: 'text',
      },
      lastname: {
        key: 'Last Name',
        keyType: 'text',
      },
      // isAdmin: {
      //   key: 'Is Admin',
      //   keyType: 'boolean',
      // },
      // isMentor: {
      //   key: 'Is Mentor',
      //   keyType: 'boolean',
      // },
      // isManager: {
      //   key: 'Is Manager',
      //   keyType: 'boolean',
      // },
      mentor: {
        key: 'Mentor',
        keyType: 'staff',
      },
      manager: {
        key: 'Manager',
        keyType: 'staff',
      },
      // level: {
      //   key: 'Level',
      //   keyType: 'dropdown',
      //   labelsArray: this.activeLevels,
      // },
      // stack: {
      //   key: 'Stack',
      //   keyType: 'dropdown',
      //   labelsArray: this.activeStacks,
      // },
      // englishLevel: {
      //   key: 'English level',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.englishLevel,
      // },
      // influence: {
      //   key: 'Influence',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.influence,
      // },
      // people: {
      //   key: 'People',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.people,
      // },
      // performanceLevel: {
      //   key: 'Performance level',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.performanceLevel,
      // },
      // softSkills: {
      //   key: 'Soft skills',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.softSkills,
      // },
      // system: {
      //   key: 'System',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.system,
      // },
      // technology: {
      //   key: 'Technology',
      //   keyType: 'dropdown',
      //   labelsArray: this.skills?.technology,
      // },
    };
  }

  private setSkillsForDropdownFilters(skill: string): void {
    const skillsFromArray = this.filteredUsers.map(
      (user) => (user as any)[skill]
    );
    if (skill === USERS_LIST_COMPONENT_STRINGS.stack) {
      const extraStacks = this.filteredUsers.map(
        (user: any) => user.extraStacks
      )
        .reduce((stacksArr, stackEl) => {
          stacksArr.push(...stackEl)
          return stacksArr;
        }, [])
        .map((stack: any) => stack.title)
      skillsFromArray.push(...extraStacks);
    }

    if (skill === USERS_LIST_COMPONENT_STRINGS.softSkills) {
      this.filteredSoftSkills = [...new Set(skillsFromArray.sort())];
    } else {
      (this as any)[
        USERS_LIST_COMPONENT_STRINGS.filtered
         + skill[0].toUpperCase() + skill.slice(1) + 's'
      ] = [...new Set(skillsFromArray.sort())];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
