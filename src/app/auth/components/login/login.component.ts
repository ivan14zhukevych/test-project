import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_core/services/global/alert.service';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  SUCCESS_MESSAGE,
} from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';
import { UserService } from 'src/app/_core/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  hide = true;
  loginForm: FormGroup;
  rememberMeForm: FormGroup;

  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.loginForm.invalid) {
      return;
    }

    const isRememberMe = this.rememberMeForm.controls['isRememberMe'].value;

    this.authService
      .login(this.loginForm.value, isRememberMe)
      .pipe(first())
      .subscribe(
        (success) => {
          this.getUser();
          this.alertService.showAlert({
            message: SUCCESS_MESSAGE.login,
            type: AlertType.Success,
          });
        },

        (error) => {
          this.isLoading = false;
        }
      );
  }

  private getUser(): void {
    this.userService.userSubject.pipe(first()).subscribe((success) => {
      this.router.navigate([this.returnUrl]);
    });
  }

  private initializeForms(): void {
    this.loginForm = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(EMAIL_REGEXP),
        ],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(PASSWORD_REGEXP)],
      ],
    });

    this.rememberMeForm = this.fb.group({
      isRememberMe: [false],
    });
  }
}
