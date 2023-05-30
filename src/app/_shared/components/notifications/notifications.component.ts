import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../../_core/services/notification/notification.service";
import {Notifications} from "../../../_core/models/notifications.model";
import {Subscription} from "rxjs";
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy{

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  buttonFocused = false;
  spinnerLoading = false;
  hiddenBadge = false;

  notificationsData: Array<Notifications> =[];
  notificationsDataOnlyActive: Array<Notifications> =[];
  notificationsDataOnlyInactive: Array<Notifications> =[];

  notificationSubscription = new Subscription();
  requestSubscription = new Subscription();

  constructor(private notificationService: NotificationService,  private router: Router){}

  ngOnInit() {
    this.notificationSubscription = this.notificationService.notificationDataSubject.subscribe((value: Array<Notifications>) => {
      this.hiddenBadge = false;
      this.notificationsDataOnlyActive = value.filter((item: Notifications) => item.is_active);
      this.notificationsData = this.notificationsDataOnlyActive.length < 5 ?  value.slice(0, 5) : this.notificationsDataOnlyActive;
      this.notificationsDataOnlyActive = this.notificationsData.filter((item: Notifications) => item.is_active);
      this.notificationsDataOnlyInactive = this.notificationsData.filter((item: Notifications) => !item.is_active);
    });
  }

  openMyMenu() {
    this.trigger.openMenu();
    this.buttonFocused = true;
    this.spinnerLoading = true;
    this.requestSubscription = this.notificationService.httpRequestForReadAllNotifications()
      .subscribe(() => {
        this.spinnerLoading = false;
        this.hiddenBadge = true;
      });
    this.notificationService.subscriptionController.next(null);
  }

  closeMyMenu() {
    this.hiddenBadge = false;
    this.trigger.closeMenu();
    this.buttonFocused = false;
    this.requestSubscription.unsubscribe();
    this.notificationService.getNotificationData();
  }

  ngOnDestroy() {
      this.notificationSubscription.unsubscribe();
      this.requestSubscription.unsubscribe();
  }

  navToUser(id: string){
    this.router.navigateByUrl(`/profile?id=${id}`).catch((err) => {
      console.log(err);
    })
  }
}

