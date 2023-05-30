export class Table {
  title: string;
  description: string;
  priority: number;
  id: number;
  isActive: boolean;

  constructor(source: any) {
    this.title = source.title;
    this.description = source.description;
    this.priority = source.priority;
    this.id = source.id;
    this.isActive = source.is_active;
  }
}
