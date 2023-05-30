import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { LEVEL_LIST_FIELDS, ESSENCE_URL } from '../../constants/constants';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Stack } from '../../interfaces/stack.interface';
import { Level } from '../../models/level.model';
import { LevelFieldsEnum } from '../../enums/level-fields.enum';
import { SkillsFieldsEnum } from '../../enums/skills-fields.enum';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  levelsListSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  skillsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  stacksSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private requestService: RequestService) {}

  loadLevels() {
    if (this.levelsListSubject.getValue()) {
      return of();
    }

    return this.requestService.get(ESSENCE_URL).pipe(
      take(1),
      map((data: any) => {
        const skills: any = {};
        LEVEL_LIST_FIELDS.forEach((item: string) => {
          const field = (LevelFieldsEnum as any)[item];

          skills[item] = data[field];
          data.level.forEach((level: any) => {
            const levelField = (SkillsFieldsEnum as any)[item];
            level[levelField] = data[field].find(
              (skill: any) => level[levelField] === skill.id
            );
          });
        });

        this.skillsSubject.next(skills);
        this.levelsListSubject.next(
          data.level.map((item: any) => new Level(item))
        );
        this.stacksSubject.next(data.stack);
      })
    );
  }

  getLevels(type: string): Observable<any> {
    return this.skillsSubject.pipe(
      map((levels) => {
        if (levels) {
          return levels[type];
        }
      })
    );
  }

  getStacks(): Observable<Stack[]> {
    return this.stacksSubject;
  }

  getLevelsList(): Observable<any> {
    return this.levelsListSubject;
  }

  updateLevels() {
    this.levelsListSubject.next(null);
    return this.loadLevels();
  }

  getActiveStacks(): Observable<Stack[]> {
    return this.stacksSubject.pipe(
      map((stacks) => stacks?.filter((stack: any) => stack.is_active))
    );
  }

  getActiveLevelsList(): Observable<Level[]> {
    return this.levelsListSubject.pipe(
      map((levelsList) => levelsList?.filter((level: any) => level.isActive))
    );
  }

  deleteMetric(metricTitle: string, metricId: number) {
    const url = `${environment.apiUrl}/${metricTitle}/${metricId}`;
    return this.requestService.delete(url);
  }

  updateMetric(metricTitle: string, metricId: number, body: any) {
    const url = `${environment.apiUrl}/${metricTitle}/${metricId}`;
    return this.requestService.patch(url, body);
  }

  createMetric(metricTitle: string, body: any) {
    const url = `${environment.apiUrl}/${metricTitle}/`;
    return this.requestService.post(url, body);
  }
}
