import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FORGOT_PASSWORD_URL,
  UPDATE_PASSWORD_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from 'src/app/_core/constants/constants';
import { LoginRequest } from 'src/app/_core/interfaces/login-request.interface';
import { RegisterRequest } from 'src/app/_core/interfaces/register-request.interface';
import { Token } from '../../models/token.model';
import { User } from '../../models/user.model';
import { RequestService } from '../global/request.service';
import { UpdatePasswordRequest } from '../../interfaces/update-password-request.interface';
import { StorageService } from '../global/storage.service';
import { UserService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<Token>(
    this.storageService.getItem('token')
  );

  constructor(
    private router: Router,
    private requestService: RequestService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  public get tokenValue(): Token {
    return this.tokenSubject.getValue();
  }

  login(user: LoginRequest, isRememberMe: boolean): Observable<Token> {
    return this.requestService.post<Token>(SIGN_IN_URL, user).pipe(
      map((response: any) => {
        let token = new Token(response);
        this.stringifyToken(token, isRememberMe);
        return token;
      })
    );
  }

  logout(): void {
    this.userService.logout();
    this.storageService.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(data: RegisterRequest): Observable<User> {
    return this.requestService.post<User>(SIGN_UP_URL, data);
  }

  forgotPassword(email: {
    emailTitle: string;
    emailValue: string;
  }): Observable<null> {
    return this.requestService.post<null>(FORGOT_PASSWORD_URL, email);
  }

  resetPassword(request: UpdatePasswordRequest): Observable<null> {
    return this.requestService.post<null>(UPDATE_PASSWORD_URL, request);
  }

  private stringifyToken(token: Token, isRememberMe: boolean): void {
    if (token && token.accessToken) {
      if (isRememberMe) {
        this.storageService.setLocalItem('token', token);
      } else {
        this.storageService.setSessionItem('token', token);
      }

      this.tokenSubject.next(token);
    }
  }
}
