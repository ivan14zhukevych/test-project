import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../../../_core/services/global/metrics.service';
import {
  TABLE_KEYS_OBJECT_ADMIN,
  TABLE_KEYS_OBJECT_USER,
} from '../../../_core/constants/constants';
import { User } from '../../../_core/models/user.model';
import { UserService } from '../../../_core/services/users/users.service';
import { UserRoles } from '../../../_core/enums/user-roles.enum';
import { Table } from '../../../_core/models/table.model';
import { SkillUpdate } from 'src/app/_core/models/skill-update.mode';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss'],
})
export class SystemsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User;
  systems: Table[];
  keysObjectUser: any;
  keysObjectAdmin: any;
  userRoles = UserRoles;

  constructor(
    private userService: UserService,
    private metricsService: MetricsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((data) => {
        this.user = data;
        if (data) {
          this.getSystems();
        }
      })
    );

    this.initializeKeysObject();
  }

  getSystems(): void {
    this.subscription.add(
      this.metricsService.getLevels('system').subscribe((data: any[]) => {
        if (data) {
          this.systems = data.map((item: any) => new Table(item));
        }
      })
    );
  }

  private initializeKeysObject() {
    this.keysObjectUser = TABLE_KEYS_OBJECT_USER;
    this.keysObjectAdmin = TABLE_KEYS_OBJECT_ADMIN;
  }

  onCreate(row: any, isDelete: boolean) {
    const skillForCreate = { ...row };

    const createdSkill = new SkillUpdate(skillForCreate, isDelete);
    this.subscription.add(
      this.metricsService
        .createMetric('systems', createdSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const skillForUpdate = { ...row };

    const updatedSkill = new SkillUpdate(skillForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('systems', skillForUpdate.id, updatedSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
