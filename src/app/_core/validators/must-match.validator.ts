import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MatchValidator {
  static checkMatch(
    controlName: string,
    matchingControlName: string,
    errorName: string = 'mustMatch'
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const control = formGroup.get(controlName)?.value;
      const matchingControl = formGroup.get(matchingControlName)?.value;
      if (control !== matchingControl) {
        formGroup.get(matchingControlName)?.setErrors({ mustMatch: true });
        return { [errorName]: true };
      }
      return null;
    };
  }
}
