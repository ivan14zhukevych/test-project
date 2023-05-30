import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PROFILE_DISPLAY_EXTRA_STACKS } from 'src/app/_core/constants/constants';
import { UserHelper } from 'src/app/_core/helpers/user.helper';
import { User } from 'src/app/_core/models/user.model';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { UserService } from 'src/app/_core/services/users/users.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {

  @Output() saveChanges = new EventEmitter();
  @Input() profileFieldTitle: string;
  @Input() set profileFieldValue(user: any) {
    this.saveUserData = user[this.profileFieldTitle];
    if(this.profileFieldTitle === PROFILE_DISPLAY_EXTRA_STACKS) {
      this.isPractice = true;
    }
  };

  subscription: Subscription = new Subscription();
  userHelper = UserHelper;
  user: User;
  getUserInformation: any;
  saveUserData: any;
  spinnerLoading = false;
  isPractice = false;
  editMode = false;

  constructor(
    private metricsService: MetricsService,
    private userService: UserService
  ) {}

  enableEditMode(profileFieldTitle: string) {
    this.editMode = true;
    if (profileFieldTitle === "mentor") {
      this.userService.getMentors().subscribe(response => {
        this.getUserInformation = response;
      });
    } else if (profileFieldTitle === "manager") {
      this.userService.getManagers().subscribe(response => {
        this.getUserInformation = response;
      });
    } else if (profileFieldTitle === "stack" || profileFieldTitle === "extraStacks") {
      this.metricsService.getStacks().subscribe(stacks => {
        this.getUserInformation = stacks;
      });
    }
  }

  saveEditedChanges() {
    const dataToSave = { [this.profileFieldTitle]: this.saveUserData }
    this.saveChanges.emit(dataToSave);
    this.editMode = false;
  }

  cancelEditedChanges() {
    this.editMode = false;
  }
}
