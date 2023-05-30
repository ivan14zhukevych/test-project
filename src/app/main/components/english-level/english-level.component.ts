import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  TABLE_KEYS_OBJECT_ADMIN,
  TABLE_KEYS_OBJECT_USER,
} from 'src/app/_core/constants/constants';
import { Level } from 'src/app/_core/models/level.model';
import { SkillUpdate } from 'src/app/_core/models/skill-update.mode';
import { Table } from 'src/app/_core/models/table.model';
import { User } from 'src/app/_core/models/user.model';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { UserService } from 'src/app/_core/services/users/users.service';

@Component({
  selector: 'app-english-level',
  templateUrl: './english-level.component.html',
  styleUrls: ['./english-level.component.scss'],
})
export class EnglishLevelComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  levels: Level[];
  user: User;
  keysObject: any;
  keysObjectAdmin: any;

  constructor(
    private metricsService: MetricsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((user) => {
        this.user = user;
        if (user) {
          this.getEnglishLevel();
        }
      })
    );
    this.initializeKeysObject();
  }

  getEnglishLevel() {
    this.subscription.add(
      this.metricsService.getLevels('englishLevel').subscribe((data) => {
        if (data) {
          this.levels = data.map((item: any) => new Table(item));
        }
      })
    );
  }

  initializeKeysObject() {
    this.keysObject = TABLE_KEYS_OBJECT_USER;
    this.keysObjectAdmin = TABLE_KEYS_OBJECT_ADMIN;
  }

  onCreate(row: any, isDelete: boolean) {
    const skillForCreate = { ...row };

    const createdSkill = new SkillUpdate(skillForCreate, isDelete);
    this.subscription.add(
      this.metricsService
        .createMetric('english-levels', createdSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const skillForUpdate = { ...row };

    const updatedSkill = new SkillUpdate(skillForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('english-levels', skillForUpdate.id, updatedSkill)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
