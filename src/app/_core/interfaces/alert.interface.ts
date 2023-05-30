import { AlertType } from '../enums/alert-type.enum';

export interface Alert {
  message: string;
  type: AlertType;
  config?: any;
}
