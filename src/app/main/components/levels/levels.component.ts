import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LEVEL_LIST_FIELDS } from 'src/app/_core/constants/constants';
import { LevelUpdate } from 'src/app/_core/models/level-update.model';
import { User } from 'src/app/_core/models/user.model';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { UserService } from 'src/app/_core/services/users/users.service';
import { Level } from '../../../_core/models/level.model';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User;
  levels: Level[];
  skills: any;
  tableKeysObject!: any;
  tableKeysObjectAdmin!: any;

  constructor(
    public metricsService: MetricsService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((userData) => {
        this.user = userData;
        if (this.user) {
          this.getLevels();
          this.getSkills();
        }
        this.initializeTableKeys();
      })
    );
  }

  getLevels(): void {
    this.subscription.add(
      this.metricsService.levelsListSubject.subscribe(
        (levelsFromSubject: Level[]) => {
          this.changeLevelsValuesFromObjectsToStrings(levelsFromSubject);
        }
      )
    );
  }

  changeLevelsValuesFromObjectsToStrings(levelsFromSubject: Level[]) {
    const levelsValuesСhangedToStrings = levelsFromSubject?.map(
      (level: Level) => {
        const levelValuesToStrings: Level = Object.assign({ ...level });
        Object.entries(levelValuesToStrings).forEach((item) => {
          (levelValuesToStrings as any)[item[0]] = item[1]?.title || item[1];
        });
        return levelValuesToStrings;
      }
    );
    this.levels = levelsValuesСhangedToStrings;
  }

  getSkills(): void {
    this.subscription.add(
      this.metricsService.skillsSubject.subscribe((data) => {
        this.skills = data;
      })
    );
  }

  private initializeTableKeys(): void {
    this.tableKeysObject = {
      title: {
        key: 'Title',
      },
      technology: {
        key: 'Technology',
      },
      system: {
        key: 'System',
      },
      people: {
        key: 'People',
      },
      softSkills: {
        key: 'Soft skills',
      },
      englishLevel: {
        key: 'English level',
      },
      performanceLevel: {
        key: 'Performance level',
      },
      isActive: {
        key: 'Active',
      },
    };
    this.tableKeysObjectAdmin = {
      title: {
        key: 'Title',
        keyType: 'text',
      },
      technology: {
        key: 'Technology',
        keyType: 'dropdown',
        labelsArray: this.skills?.technology,
      },
      system: {
        key: 'System',
        keyType: 'dropdown',
        labelsArray: this.skills?.system,
      },
      people: {
        key: 'People',
        keyType: 'dropdown',
        labelsArray: this.skills?.people,
      },
      softSkills: {
        key: 'Soft skills',
        keyType: 'dropdown',
        labelsArray: this.skills?.softSkills,
      },
      englishLevel: {
        key: 'English level',
        keyType: 'dropdown',
        labelsArray: this.skills?.englishLevel,
      },
      influence: {
        key: 'Influence',
        keyType: 'dropdown',
        labelsArray: this.skills?.influence,
      },
      performanceLevel: {
        key: 'Performance level',
        keyType: 'dropdown',
        labelsArray: this.skills?.performanceLevel,
      },
      isActive: {
        key: 'Active',
        keyType: 'boolean',
      },
      priority: {
        key: 'Priority',
        keyType: 'number',
      },
    };
  }

  onCreate(row: any, isDelete: boolean) {
    const levelForCreate = { ...row };

    this.changeLevelsFieldsFromTitleToID(levelForCreate);

    const createdLevel = new LevelUpdate(levelForCreate, isDelete);
    this.subscription.add(
      this.metricsService
        .createMetric('levels', createdLevel)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  onEditOrDelete(row: any, isDelete: boolean): void {
    const levelForUpdate = { ...row };

    this.changeLevelsFieldsFromTitleToID(levelForUpdate);

    const updatedLevel = new LevelUpdate(levelForUpdate, isDelete);
    this.subscription.add(
      this.metricsService
        .updateMetric('levels', levelForUpdate.id, updatedLevel)
        .pipe(switchMap(() => this.metricsService.updateLevels()))
        .subscribe()
    );
  }

  changeLevelsFieldsFromTitleToID(levelForUpdate: any): void {
    LEVEL_LIST_FIELDS.forEach((field) => {
      levelForUpdate[field] = this.skills[field].find(
        (item: any) => item.title === levelForUpdate[field]
      )?.id;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
