import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  PASSWORD_REGEXP,
  SUCCESS_MESSAGE,
} from 'src/app/_core/constants/constants';
import { MatchValidator } from 'src/app/_core/validators/must-match.validator';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { AlertService } from 'src/app/_core/services/global/alert.service';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';

@Component({
  selector: 'app-reset-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  isLoading = false;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;
  token: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.form.invalid) {
      return;
    }

    const request = {
      old_password: this.formControls['old_password'].value,
      new_password: this.formControls['new_password'].value,
      confirm_new_password: this.formControls['confirm_new_password'].value,
    };

    this.authService
      .resetPassword(request)
      .pipe(first())
      .subscribe(
        (success) => {
          this.authService.logout();
          this.alertService.showAlert({
            message: SUCCESS_MESSAGE.resetPassword,
            type: AlertType.Success,
          });
        },

        (error) => {
          this.isLoading = false;
        }
      );
  }

  private initializeForm(): void {
    this.form = this.fb.group(
      {
        old_password: [
          null,
          [Validators.required, Validators.pattern(PASSWORD_REGEXP)],
        ],
        new_password: [
          null,
          [Validators.required, Validators.pattern(PASSWORD_REGEXP)],
        ],
        confirm_new_password: [
          null,
          [Validators.required, Validators.pattern(PASSWORD_REGEXP)],
        ],
      },
      {
        validators: MatchValidator.checkMatch('new_password', 'confirm_new_password'),
      }
    );
  }

  private initializeValues(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
  }
}
