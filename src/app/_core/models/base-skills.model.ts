export class BaseSkills {
  description: string;
  id: number;
  priority: number;
  title: string;
  isActive: boolean;

  constructor(source: any) {
    this.description = source.description;
    this.id = source.id;
    this.priority = source.priority;
    this.title = source.title;
    this.isActive = source.is_active;
  }
}
