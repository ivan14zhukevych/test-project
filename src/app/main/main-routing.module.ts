import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../_core/guards/admin.guard';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeopleComponent } from './components/people/people.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { EnglishLevelComponent } from './components/english-level/english-level.component';
import { MainComponent } from './main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PerformanceLevelsComponent } from './components/performance-levels/performance-levels.component';
import { InfluencesComponent } from './components/influences/influences.component';
import { LevelsComponent } from './components/levels/levels.component';
import { SystemsComponent } from './components/systems/systems.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { AdminMentorManagerGuard } from '../_core/guards/admin-mentor-manager.guard';
import { SidedropdownComponent } from '../_shared/components/sidedropdown/sidedropdown.component';

const routes: Routes = [
  {
    path: 'skills',
    component: SidedropdownComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        data: {
          title: 'Admin',
        },
      },
      {
        path: 'user',
        component: UserProfileComponent,
        data: {
          title: 'User Profile',
        },
      },

      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AdminGuard],
        data: {
          title: 'User Profile',
        },
      },
      {
        path: 'levels',
        component: LevelsComponent,
        data: {
          title: 'Levels',
        },
      },
      {
        path: 'users-list',
        component: UsersListComponent,
        canActivate: [AdminMentorManagerGuard],
        data: {
          title: 'Users List',
        },
      },
      {
        path: 'people',
        component: PeopleComponent,
        data: {
          title: 'People',
        },
      },
      {
        path: 'english-levels',
        component: EnglishLevelComponent,
        data: {
          title: 'English Levels',
        },
      },
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'softskills',
        component: SoftSkillsComponent,
        data: {
          title: 'Soft Skills',
        },
      },
      {
        path: 'performance-levels',
        component: PerformanceLevelsComponent,
        data: {
          title: 'Perfomance levels',
        },
      },
      {
        path: 'influences',
        component: InfluencesComponent,
        data: {
          title: 'Influences',
        },
      },
      {
        path: 'systems',
        component: SystemsComponent,
        data: {
          title: 'Systems',
        },
      },
      {
        path: 'technologies',
        component: TechnologiesComponent,
        data: {
          title: 'Technologies',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
