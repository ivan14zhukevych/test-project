import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetricsService } from '../../../_core/services/global/metrics.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../_core/services/users/users.service';
import { User } from '../../../_core/models/user.model';
import {
  DASHBOARD_SETTINGS,
  DASHBOARD_SETTINGS_1,
  LEVEL_LIST_FIELDS,
  RADAR_OPTIONS
} from "../../../_core/constants/constants";
import { SkillsEnum } from "../../../_core/enums/skills.enum";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  radarChartData: any = [];
  user: any;
  levels: any = [];
  radarTableData!: any;
  displayedColumns: string[] = ['skill', 'currentLevel', 'selectedLevel'];
  subscription: Subscription = new Subscription();
  defaultLevelInSelectLevelFormField: any;

  public radarChartLabels: string[] = LEVEL_LIST_FIELDS.map((level: string) => (SkillsEnum as any)[level]);

  public radarOptions: any = {
    tooltips: {
      mode: 'index',
      callbacks: {
        title: (tooltipItem: any, data: any) =>
          data.labels[tooltipItem[0].index],

        label: (tooltipItem: any, data: any) =>
          data.datasets[tooltipItem.datasetIndex].label,
      },
    },
    ...RADAR_OPTIONS
  };

  constructor(
    private metricsService: MetricsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
        if (user) {
          this.getLevels();
        }
      })
    );
  }

  getLevels(): void {
    this.metricsService.levelsListSubject.subscribe((levels: any) => {
      if (levels) {
        this.levels = levels;
        this.addLevel(levels[3]);
        this.defaultLevelInSelectLevelFormField = levels[3];

        this.radarChartData[0] = {
          data: this.getSkillsPriority(this.user.skills),
          label: `Your current level: ${this.user.level.title}`,
          ...DASHBOARD_SETTINGS
        };

        this.radarTableData = LEVEL_LIST_FIELDS.map((level: string) => {
          const userSkills = this.user.skills;
          const data: any = {
            skill: (SkillsEnum as any)[level],
            currentLevel: userSkills[level].title,
            selectedLevel: this.levels[3][level].title,
            currentPriority: userSkills[level].priority,
            selectedPriority: this.levels[3][level].priority,
            level
          };

          return data;
        });
      }
    });
  }

  getSkillsPriority(skills: any) {
    return LEVEL_LIST_FIELDS.map((level: string) => skills[level].priority);
  }

  addLevel(data: any) {
    if (this.radarTableData) {
      console.log(this.radarTableData);
      this.radarTableData.forEach((item: any) => {
        item.selectedLevel = data[item.level].title;
        item.selectedPriority = data[item.level].priority;
      });
    }

    this.radarChartData[1] = {
      data: this.getSkillsPriority(data),
      label: `Selected level: ${data.title}`,
      ...DASHBOARD_SETTINGS_1
    };
  }

  public radarChartType: any = 'radar';

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
