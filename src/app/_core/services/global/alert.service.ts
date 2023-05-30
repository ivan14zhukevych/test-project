import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertType } from '../../enums/alert-type.enum';
import { Alert } from '../../interfaces/alert.interface';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private toastrService: ToastrService) {}

  showAlert(alert: Alert): void {
    switch (alert.type) {
      case AlertType.Success:
        this.toastrService.success(alert.message, '', alert.config);
        break;

      case AlertType.Error:
        this.toastrService.error(alert.message, '', alert.config);
        break;

      case AlertType.Warning:
        this.toastrService.warning(alert.message, '', alert.config);
        break;

      case AlertType.Info:
        this.toastrService.info(alert.message, '', alert.config);
        break;

      default:
      case AlertType.Info:
        this.toastrService.info(alert.message, '', alert.config);
        break;
    }
  }
}
