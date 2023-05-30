import { Level } from './level.model';
import { Stack } from '../interfaces/stack.interface';
import { BaseSkills } from './base-skills.model';

export class UserForAdmin {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  isManager: boolean;
  isMentor: boolean;
  isActive: boolean;
  level: Level;
  stack: Stack;
  extraStacks: Stack[];
  englishLevel: BaseSkills;
  influence: BaseSkills;
  people: BaseSkills;
  performanceLevel: BaseSkills;
  softSkills: BaseSkills;
  system: BaseSkills;
  technology: BaseSkills;
  mentor: any;
  manager: any;

  constructor(source: any) {
    this.getSplitedName(source.display_name, this);
    this.id = source.id;
    this.email = source.work_email;
    this.isAdmin = !!source.employee_type;
    this.isMentor = !!source.employee_type;
    this.isManager = !!source.employee_type;
    this.isActive = true;
    // this.level = new Level(source.level);
    // this.stack = source.stack;
    // this.extraStacks = source.extra_stack;
    // this.englishLevel = new BaseSkills(source.skills.english_level);
    // this.influence = new BaseSkills(source.skills.influence);
    // this.people = new BaseSkills(source.skills.people);
    // this.performanceLevel = new BaseSkills(source.skills.performance_level);
    // this.softSkills = new BaseSkills(source.skills.soft_skill);
    // this.system = new BaseSkills(source.skills.system_level);
    // this.technology = new BaseSkills(source.skills.technology);
    this.mentor = {};
    this.manager = {};
    this.getSplitedName(source.competency_lead_id[1], this.mentor);
    this.getSplitedName(source.leave_manager_id[1], this.manager);
    console.log(this);
  }

  private getSplitedName(name: string, person: any) {
    const splitedName = name.split(' ');
    person.firstname = splitedName[0];
    person.lastname = splitedName[1];
    console.log(person);
  }
}

