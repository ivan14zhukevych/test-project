import { Level } from './level.model';
import { Stack } from '../interfaces/stack.interface';
import { Skills } from "./skills.model";
import { PersonInfo } from "../interfaces/person-info.interface";
import { Goal } from "./objective.model";
import { DOWNLOAD_LEVEL_LIST_FIELDS } from "../constants/constants";

export class User {
  email: string;
  firstname: string;
  lastname: string;
  id: string;
  isActive: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  isMentor: boolean;
  isManager: boolean;
  isVerified: boolean;
  mentor: PersonInfo;
  manager: PersonInfo;
  level: Level;
  stack: Stack;
  extraStacks: Stack[];
  skills: Skills;
  goals: Goal[];
  previousGoals: Goal[];

  constructor(source: any) {
    this.email = source.email;
    this.firstname = source.firstname;
    this.id = source.id;
    this.isActive = source.is_active;
    this.isAdmin = source.is_admin;
    this.isEmployee = source.is_employee;
    this.isMentor = source.is_mentor;
    this.isManager = source.is_manager;
    this.isVerified = source.is_verified;
    this.lastname = source.lastname;
    this.level = new Level(source.level);
    this.stack = source.stack;
    this.extraStacks = source.extra_stack;
    this.skills = this.getSkills(source);
    this.mentor = source.mentor;
    this.manager = source.manager;
    this.goals = this.getGoals(source.appraisals);
    this.previousGoals = this.getGoals(source.appraisals, true);
  }

  private getGoals(appraisals: any, previous?: boolean) {
    const app = appraisals?.find((item: any) => item.is_active === !previous);
    return app ? app.goals.map((item: any) => new Goal(item)) : [];
  }

  private getSkills(user: any) {
    let skills: any = {};

    if (user.skills) {
      skills = user.skills;
    } else {
      DOWNLOAD_LEVEL_LIST_FIELDS.forEach((skill: any) => skills[skill] = user[skill]);
    }
    return new Skills(skills);
  }
}

