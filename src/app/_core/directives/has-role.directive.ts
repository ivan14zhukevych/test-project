import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRoles } from 'src/app/_core/enums/user-roles.enum';
import { User } from '../models/user.model';

@Directive({
  selector: '[userHasRole]',
})
export class HasRoleDirective implements OnChanges {
  @Input() public userHasRole: UserRoles | UserRoles[];
  @Input() public user: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnChanges() {
    if (this.hasPermission()) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  private hasPermission(): boolean {
    if (!this.user) {
      return false;
    }

    if (typeof this.userHasRole === 'string') {
      return this.user[this.userHasRole];
    }

    if (Array.isArray(this.userHasRole)) {
      return this.userHasRole.find(role => this.user[role] === true) ? true : false;
    }

    return false;
  }
}
