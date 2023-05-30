export class UserUpdate {
  firstname: string;
  lastname: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_manager: boolean;
  is_mentor: boolean;
  stack_id: number;
  extra_stack_list_id: [];
  level_id: number;
  technology_id: number;
  system_level_id: number;
  people_id: number;
  soft_skill_id: number;
  english_level_id: number;
  performance_level_id: number;
  influence_id: number;
  manager: string;
  mentor: string;

  constructor(user: any) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.is_verified = true;
    this.is_active = user.isActive;
    this.is_admin = user.isAdmin;
    this.is_manager = user.isManager;
    this.is_mentor = user.isMentor;
    this.stack_id = user.stack?.id;
    this.extra_stack_list_id = user.extraStackList?.map((item: any) => item.id) || [];
    this.level_id = user.level.id;
    this.technology_id = user.skills.technology?.id || user.skills.technology;
    this.system_level_id = user.skills.system?.id || user.skills.system;
    this.people_id = user.skills.people?.id || user.skills.people;
    this.soft_skill_id = user.skills.softSkills?.id || user.skills.softSkills;
    this.english_level_id = user.skills.englishLevel?.id || user.skills.englishLevel;
    this.performance_level_id = user.skills.performanceLevel?.id || user.skills.performanceLevel;
    this.influence_id = user.skills.influence?.id || user.skills.influence;
    this.manager = user.manager?.id || '';
    this.mentor = user.mentor?.id || '';
  }
}
