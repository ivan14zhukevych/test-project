import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ERROR_MESSAGE } from '../constants/constants';
import { AlertType } from '../enums/alert-type.enum';
import { AuthService } from '../services/auth/auth.service';
import { AlertService } from '../services/global/alert.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  canActivate() {
    const storagetoken = this.authService.tokenValue;

    if (storagetoken) {
      this.alertService.showAlert({
        message: ERROR_MESSAGE.isLoggedIn,
        type: AlertType.Error,
      });
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
