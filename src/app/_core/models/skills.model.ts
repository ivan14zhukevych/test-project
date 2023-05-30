import { ILevel } from "../interfaces/level.interface";

export class Skills {
  technology: ILevel;
  system: ILevel;
  people: ILevel;
  englishLevel: ILevel
  performanceLevel: ILevel;
  softSkills: ILevel;
  influence: ILevel;

  constructor(source: any) {
    this.englishLevel = source.english_level;
    this.people = source.people;
    this.performanceLevel = source.performance_level;
    this.softSkills = source.soft_skill;
    this.system = source.system_level;
    this.technology = source.technology;
    this.influence = source.influence;
  }

}
