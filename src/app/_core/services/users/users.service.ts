import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ADMIN_USERS,
  ADMIN_USER_BY_ID,
  GET_MANAGERS_URL,
  GET_MENTORS_URL,
  LEVEL_LIST_FIELDS,
  STAFF_MANAGER,
  STAFF_MENTOR,
  USER_ME_URL,
} from 'src/app/_core/constants/constants';
import { User } from '../../models/user.model';
import { RequestService } from '../global/request.service';
import { UserForAdmin } from '../../models/user-for-admin.model';
import { UserPatchRequest } from '../../interfaces/user-patch-request';
import { MetricsService } from '../global/metrics.service';
import { UserByIdPatchRequest } from '../../interfaces/user-by-id-patch.request';
import { Level } from '../../models/level.model';
import * as userData from './user.json';
import * as usersData from './users-list.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userByIdSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private isUserLoading: boolean;

  constructor(
    private requestService: RequestService,
    private metricsService: MetricsService
  ) { }

  getUser(): Observable<User> {
    return this.userSubject.getValue() ? this.userSubject : this.getUserData();
  }

  getUserById(id: any): Observable<User> {
    return this.userByIdSubject.getValue()
      ? this.userByIdSubject
      : this.getUserByIdData(id);
  }

  getUserData(): Observable<User> {
    if (this.isUserLoading) {
      return this.userSubject;
    }
    this.isUserLoading = true;
    // return this.requestService.get(USER_ME_URL).pipe(
    //   map(() => {
        const user = new User(userData);
        this.userSubject.next(user);
        this.isUserLoading = false;
        return of(user);
      // })
    // );
  }

  getUserByIdData(id: string): Observable<User> {
    return this.requestService.get(`${ADMIN_USER_BY_ID}/${id}`).pipe(
      map((value) => {
        const user: any = new User(value);
        this.metricsService.skillsSubject.subscribe((items: any) => {
          if (items) {
            user.stack = this.metricsService.stacksSubject
              .getValue()
              .find((item: any) => user.stack.id === item.id);
            user.level = this.metricsService.levelsListSubject
              .getValue()
              .find((item: Level) => user.level.id === item.id);
            LEVEL_LIST_FIELDS.forEach((field: string) => {
              user.skills[field] = items[field].find(
                (item: any) => item.id === user.skills[field].id
              );
            });
            this.userByIdSubject.next(user);
          }
        });

        return user;
      })
    );
  }
  getMentors(): Observable<UserForAdmin[]> {
    return this.requestService.get(GET_MENTORS_URL)
  }

  getManagers(): Observable<UserForAdmin[]> {
    return this.requestService.get(GET_MANAGERS_URL)
  }

  getAllUsers(): Observable<any> {
    // const user = this.userSubject.getValue();
    console.log(usersData)
    const usersData1 = usersData;
    const users: any[] = usersData1.users.map(item => new UserForAdmin(item));



    return of(users);

    // const usersToDisplay$: Observable<UserForAdmin[]>[] = [];
    //
    // if (this.userSubject.getValue()[UserRoles.Admin]) {
    //   usersToDisplay$.push(this.requestService.get<UserForAdmin[]>(ADMIN_USERS))
    // } else {
    //   if (this.userSubject.getValue()[UserRoles.Manager]) {
    //     usersToDisplay$.push(this.requestService.get<UserForAdmin[]>(`${STAFF_MANAGER}?staff_id=${user?.id}`))
    //   }
    //   if (this.userSubject.getValue()[UserRoles.Mentor]) {
    //     usersToDisplay$.push(this.requestService.get<UserForAdmin[]>(`${STAFF_MENTOR}?staff_id=${user?.id}`))
    //   }
    // }
    //
    // return combineLatest(usersToDisplay$)
    //   .pipe(
    //     map(combinedArr => {
    //       const users = combinedArr.reduce((usersArr, combinedEl) => {
    //         usersArr.push(...combinedEl)
    //         return usersArr
    //       }, [])
    //         .filter((user, index, array) => index === array.findIndex(el => el.id === user.id))
    //
    //       return users.reduce((memo: UserForAdmin[], userEl) => {
    //         const newUser = new UserForAdmin(userEl);
    //         if (newUser.isActive && user?.id !== newUser.id) {
    //           memo.push(newUser);
    //         }
    //         return memo;
    //       }, [])
    //     })
    //   )
  }

  updateUserNames(updateData: UserPatchRequest): Observable<string> {
    return this.requestService.patch<string>(USER_ME_URL, updateData);
  }

  updateUserById(
    id: string,
    updateData: UserByIdPatchRequest
  ): Observable<string> {
    return this.requestService.patch<string>(
      `${ADMIN_USER_BY_ID}/${id}`,
      updateData
    );
  }

  logout() {
    this.userSubject.next(null);
    this.isUserLoading = false;
  }
}
