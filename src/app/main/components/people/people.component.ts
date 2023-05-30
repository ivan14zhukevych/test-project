import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../_core/models/user.model';
import { MetricsService } from '../../../_core/services/global/metrics.service';
import { UserService } from '../../../_core/services/users/users.service';
import {
  TABLE_KEYS_OBJECT_ADMIN,
  TABLE_KEYS_OBJECT_USER,
} from '../../../_core/constants/constants';
import { Table } from 'src/app/_core/models/table.model';
import { SkillUpdate } from 'src/app/_core/models/skill-update.mode';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User;
  people: Table[];
  tableKeysObject!: any;
  tableKeysObjectAdmin!: any;

  constructor(
    public metricsService: MetricsService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((data) => {
        this.user = data;
        if (data) {
          this.getPeople();
        }
      })
    );

    this.initializeTableKeysObject();
  }

  getPeople(): void {
    this.subscription.add(
      this.metricsService.getLevels('people').subscribe((data: any[]) => {
        if (data) {
          this.people = data.map((item: any) => new Table(item));
        }
      })
    );
  }

  private initializeTableKeysObject() {
    this.tableKeysObject = TABLE_KEYS_OBJECT_USER;
    this.tableKeysObjectAdmin = TABLE_KEYS_OBJECT_ADMIN;
  }

  onCreate(row: any, isDelete: boolean) {
    const skillForCreate = { ...row };

    const createdSkill = new SkillUpdate(skillForCreate, isDelete);
    this.subscription.add(
      this.metricsService
        .createMetric('peoples', createdSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const skillForUpdate = { ...row };

    const updatedSkill = new SkillUpdate(skillForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('peoples', skillForUpdate.id, updatedSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
