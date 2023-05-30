export class Goal {
  title: string;
  additionalData: any;
  id: number;
  createdDate: string;
  status: string;
  updatedDate: string;
  description: string;

  constructor(source: any) {
    this.title = source.title;
    this.additionalData = source.additional_data;
    this.id = source.id;
    this.createdDate = new Date(source.created_date).toDateString();
    this.description = source.description;
    this.status = source.status;
    this.updatedDate = new Date(source.updated_date).toDateString();
  }
}
