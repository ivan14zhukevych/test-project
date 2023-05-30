import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRoles } from '../_core/enums/user-roles.enum';
import { User } from '../_core/models/user.model';
import { UserService } from '../_core/services/users/users.service';
import {NotificationService} from "../_core/services/notification/notification.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  userRoles = UserRoles;
  user: User;
  subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((user) => {
        this.user = user;

        if (this.user.id) {
          this.notificationService.getNotificationData();
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
