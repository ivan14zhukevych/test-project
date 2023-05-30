import {
  Component,
  EventEmitter, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../_core/models/user.model';
import { UserService } from 'src/app/_core/services/users/users.service';
import { UserRoles } from '../../../_core/enums/user-roles.enum';
import { AuthService } from "../../../_core/services/auth/auth.service";
import { ActivatedRouteSnapshot, ResolveEnd, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter } from "rxjs/operators";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription = new Subscription();
  userRoles = UserRoles;

  @Output() toggle = new EventEmitter();


  constructor(private userService: UserService,
    private authService: AuthService,
    public readonly title: Title,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.userSubject.subscribe((user) => (this.user = user))
    );

    this.setupTitleListener();
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  private setupTitleListener() {
    this.router.events
      .pipe(filter(event => event instanceof ResolveEnd))
      .subscribe((event: any) => {
        const { data } = getChildSnapshot(event.state.root)
        if (data?.title) {
          this.title.setTitle(data.title)
        }
      })

    function getChildSnapshot(snapshot: ActivatedRouteSnapshot) {
      let deepestChild = snapshot.firstChild
      while (deepestChild?.firstChild) {
        deepestChild = deepestChild.firstChild
      }
      return deepestChild || snapshot;
    }
  }

  logout(): void {
    this.authService.logout();
    this.userService.userSubject.next(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
