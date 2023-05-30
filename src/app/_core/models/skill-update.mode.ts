export class SkillUpdate {
  title: string;
  description: string;
  priority: number;
  is_active: boolean;

  constructor(skill: any, isDelete: boolean) {
    this.title = skill.title;
    this.description = skill.description;
    this.priority = skill.priority;
    this.is_active = isDelete ? !isDelete : skill.isActive;
  }
}