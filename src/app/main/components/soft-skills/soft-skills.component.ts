import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { User } from 'src/app/_core/models/user.model';
import { UserService } from 'src/app/_core/services/users/users.service';
import {
  TABLE_KEYS_OBJECT_ADMIN,
  TABLE_KEYS_OBJECT_USER,
} from 'src/app/_core/constants/constants';
import { Table } from 'src/app/_core/models/table.model';
import { SkillUpdate } from 'src/app/_core/models/skill-update.mode';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
})
export class SoftSkillsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tableKeysObject!: any;
  tableKeysObjectAdmin!: any;
  user: User;
  softSkills: Table[];

  constructor(
    public userService: UserService,
    private metricsService: MetricsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.userSubject.subscribe((data) => {
        this.user = data;
        if (data) {
          this.getSoftSkills();
        }
      })
    );

    this.initializeKeysObject();
  }

  getSoftSkills(): void {
    this.subscription.add(
      this.metricsService.getLevels('softSkills').subscribe((data: any[]) => {
        if (data) {
          this.softSkills = data.map((item: any) => new Table(item));
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
        .createMetric('softskills', createdSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const skillForUpdate = { ...row };

    const updatedSkill = new SkillUpdate(skillForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('softskills', skillForUpdate.id, updatedSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
