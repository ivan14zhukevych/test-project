import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { AlertService } from '../services/global/alert.service';
import { AlertType } from '../enums/alert-type.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && this.authService.tokenValue) {
          this.authService.logout();
        }

        let error = err.statusText;

        if(err.statusText === 'Unknown Error'){
        error = 'Something went wrong';
        }
        if (Array.isArray(err.error.detail)) {
          error = err.error.detail.map((value: any) => value.msg);
        }
        if (typeof err.error.detail === 'string') {
          error = err.error.detail;
        }

        this.alertService.showAlert({
          message: error,
          type: AlertType.Error,
          // config: { disableTimeOut: true },
        });

        return throwError(error);
      })
    );
  }
}
