export class LevelUpdate {
  title: string;
  technology: number;
  system: number;
  people: number;
  soft_skills: number;
  english_level: number;
  performance_level: number;
  influence: number;
  is_active: boolean;
  priority: number

  constructor(level: any, isDelete: boolean) {
    this.title = level.title;
    this.technology = level.technology;
    this.system = level.system;
    this.people = level.people;
    this.soft_skills = level.softSkills;
    this.english_level = level.englishLevel;
    this.performance_level = level.performanceLevel;
    this.influence = level.influence;
    this.is_active = isDelete ? !isDelete : level.isActive;
    this.priority = level.priority;
  }
}