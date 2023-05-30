export class Level {
  title: string;
  technology: string;
  system: string;
  people: string;
  softSkills: string;
  englishLevel: string;
  performanceLevel: string;
  isActive: boolean;
  priority: number;
  id: number;
  influence: string;

  constructor(source: any) {
    this.title = source.title;
    this.technology = source.technology;
    this.system = source.system;
    this.people = source.people;
    this.softSkills = source.soft_skills;
    this.englishLevel = source.english_level;
    this.performanceLevel = source.performance_level;
    this.isActive = source.is_active;
    this.priority = source.priority;
    this.id = source.id;
    this.influence = source.influence;
  }
}
