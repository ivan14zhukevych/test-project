import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ERROR_MESSAGE } from '../constants/constants';
import { AlertType } from '../enums/alert-type.enum';
import { AlertService } from '../services/global/alert.service';
import { UserService } from '../services/users/users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminMentorManagerGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((user: User) => {
        if (!user) {
          this.alertService.showAlert({
            message: ERROR_MESSAGE.access,
            type: AlertType.Error,
          });
          this.router.navigate(['/auth/'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }

        if (!user.isAdmin && !user.isMentor && !user.isManager) {
          this.alertService.showAlert({
            message: ERROR_MESSAGE.access,
            type: AlertType.Error,
          });
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
