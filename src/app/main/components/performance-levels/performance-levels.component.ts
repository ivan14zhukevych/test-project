import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  TABLE_KEYS_OBJECT_ADMIN,
  TABLE_KEYS_OBJECT_USER,
} from 'src/app/_core/constants/constants';
import { SkillUpdate } from 'src/app/_core/models/skill-update.mode';
import { Table } from 'src/app/_core/models/table.model';
import { User } from 'src/app/_core/models/user.model';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { UserService } from 'src/app/_core/services/users/users.service';

@Component({
  selector: 'app-performance-levels',
  templateUrl: './performance-levels.component.html',
  styleUrls: ['./performance-levels.component.scss'],
})
export class PerformanceLevelsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tableKeysObject!: any;
  tableKeysObjectAdmin!: any;
  user: User;
  performanceLevel: Table[];

  constructor(
    public userService: UserService,
    private metricsService: MetricsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.userSubject.subscribe((data) => {
        this.user = data;
        if (data) {
          this.getPergormanceLevels();
        }
      })
    );

    this.initializeKeysObject();
  }

  getPergormanceLevels(): void {
    this.subscription.add(
      this.metricsService
        .getLevels('performanceLevel')
        .subscribe((data: any[]) => {
          if (data) {
            this.performanceLevel = data.map((item: any) => new Table(item));
          }
        })
    );
  }

  initializeKeysObject() {
    this.tableKeysObject = TABLE_KEYS_OBJECT_USER;
    this.tableKeysObjectAdmin = TABLE_KEYS_OBJECT_ADMIN;
  }

  onCreate(row: any, isDelete: boolean) {
    const skillForCreate = { ...row };

    const createdSkill = new SkillUpdate(skillForCreate, isDelete);
    this.subscription.add(
      this.metricsService
        .createMetric('performance-levels', createdSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const skillForUpdate = { ...row };

    const updatedSkill = new SkillUpdate(skillForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('performance-levels', skillForUpdate.id, updatedSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
