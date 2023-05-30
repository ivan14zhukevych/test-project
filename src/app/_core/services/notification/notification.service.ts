import {Injectable} from "@angular/core";
import {RequestService} from "../global/request.service";
import {BehaviorSubject, Observable, Subject, timer} from "rxjs";
import {map, mergeMap, takeUntil} from "rxjs/operators";
import {Notifications} from "../../models/notifications.model";
import {NOTIFICATION_ALL, NOTIFICATION_READ_ALL} from "../../constants/constants";

@Injectable()

export class NotificationService {
  notificationDataSubject: BehaviorSubject<any> = new BehaviorSubject<Array<Notifications>>([]);
  subscriptionController: Subject<any> = new Subject<any>();

  constructor(private requestService: RequestService) {
  }

  httpRequestForNotifications(): Observable<void> {
    return this.requestService.get(NOTIFICATION_ALL).pipe(
      map((notifications) => this.notificationDataSubject.next(notifications))
    );
  }

  httpRequestForReadAllNotifications(): Observable<void> {
    return this.requestService.post(NOTIFICATION_READ_ALL, this.notificationDataSubject.getValue())
  }

  getNotificationData(): void{
    timer(0,30000)
      .pipe(
        mergeMap(() =>
          this.httpRequestForNotifications()
        ),
        takeUntil(this.subscriptionController))
      .subscribe();
  }
}




