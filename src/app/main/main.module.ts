import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material.module';

import { MainComponent } from './main.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleComponent } from './components/people/people.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { PerformanceLevelsComponent } from './components/performance-levels/performance-levels.component';
import { InfluencesComponent } from './components/influences/influences.component';
import { LevelsComponent } from './components/levels/levels.component';
import { EnglishLevelComponent } from './components/english-level/english-level.component';

import { SystemsComponent } from './components/systems/systems.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    UserProfileComponent,
    PeopleComponent,
    UserProfileComponent,
    UsersListComponent,
    SoftSkillsComponent,
    PerformanceLevelsComponent,
    InfluencesComponent,
    LevelsComponent,
    EnglishLevelComponent,
    InfluencesComponent,
    SystemsComponent,
    TechnologiesComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
