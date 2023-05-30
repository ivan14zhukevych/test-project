import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { slideInOut } from 'src/app/_core/animations/sidenav-animation';
import { UserRoles } from 'src/app/_core/enums/user-roles.enum';
import { Sidenav } from 'src/app/_core/interfaces/sidenav.interface';
import { User } from 'src/app/_core/models/user.model';
import { UserService } from 'src/app/_core/services/users/users.service';
import { SIDENAV_ITEMS } from "../../../_core/constants/constants";
import {coerceStringArray} from "@angular/cdk/coercion";


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideInOut]
})
export class SidenavComponent implements OnInit, OnDestroy {
  userRoles = UserRoles;
  user: User;
  subscription: Subscription = new Subscription();
  isExpanded = false;
  public menuState: string = 'out';

  @Output() toggle1 = new EventEmitter();

  sideNavItems: Sidenav[] = SIDENAV_ITEMS;

  constructor(private userService: UserService,) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.userSubject.subscribe((user) => (this.user = user))
    );
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  consoldrop() {
      this.toggle1.emit();
  }

}


