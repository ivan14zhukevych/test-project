import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {
  EMAIL_REGEXP,
  NAME_REGEXP,
  PASSWORD_REGEXP,
  SUCCESS_MESSAGE,
} from 'src/app/_core/constants/constants';
import {MatchValidator} from 'src/app/_core/validators/must-match.validator';
import {AlertService} from 'src/app/_core/services/global/alert.service';
import {AuthService} from 'src/app/_core/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {AlertType} from 'src/app/_core/enums/alert-type.enum';
import {Stack} from 'src/app/_core/interfaces/stack.interface';
import {Level} from 'src/app/_core/models/level.model';
import {MetricsService} from 'src/app/_core/services/global/metrics.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  hidePassword = true;
  stacks$: Stack[];
  levels$: Level[];
  registerForm: FormGroup;
  extraStacks!: any;
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private metricsService: MetricsService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (success) => {
          this.router.navigate(['/auth/login']);
          this.alertService.showAlert({
            message: SUCCESS_MESSAGE.register,
            type: AlertType.Success,
          });
        },

        (error) => {
          this.isLoading = false;
        }
      );
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        firstname: [
          null,
          [
            Validators.required,
            Validators.pattern(NAME_REGEXP),
            Validators.minLength(3),
          ],
        ],
        lastname: [
          null,
          [
            Validators.required,
            Validators.pattern(NAME_REGEXP),
            Validators.minLength(3),
          ],
        ],
        email: [
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
        confirm_password: [
          null,
          [Validators.required, Validators.pattern(PASSWORD_REGEXP)],
        ],
        stack_id: [null, [Validators.required]],
        extra_stack_list_id: [{value: [], disabled: true}],
        level_id: [null, [Validators.required]],
      },
      {
        validators: MatchValidator.checkMatch('password', 'confirm_password'),
      }
    );
  }

  private initializeValues(): void {
    this.subscription.add(this.metricsService.getActiveStacks().subscribe((stacks: Stack[]) => this.stacks$ = stacks));
    this.subscription.add(this.metricsService.getActiveLevelsList().subscribe((levels: Level[]) => this.levels$ = levels))
  }

  checkMatchingStack(title: string) {
    this.registerForm.controls.extra_stack_list_id.reset(
      this.registerForm.controls.extra_stack_list_id.value
        .filter((stack: number) => stack !== this.registerForm.controls.stack_id.value))
    this.registerForm.controls.extra_stack_list_id.enable();
    return title;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
