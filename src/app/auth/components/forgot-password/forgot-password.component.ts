import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
  EMAIL_REGEXP,
  SUCCESS_MESSAGE,
} from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { AlertService } from 'src/app/_core/services/global/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.form.invalid) {
      return;
    }

    this.authService
      .forgotPassword(this.form.value)
      .pipe(first())
      .subscribe(
        (success) => {
          this.isSubmitted = true;
          this.isLoading = false;
          this.alertService.showAlert({
            message: SUCCESS_MESSAGE.forgotPassword,
            type: AlertType.Success,
          });
        },

        (error) => {
          this.isLoading = false;
        }
      );
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(EMAIL_REGEXP),
        ],
      ],
    });
  }
}
