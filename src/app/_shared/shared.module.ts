import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { HasRoleDirective } from '../_core/directives/has-role.directive';
import { TableComponent } from './components/table/table.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalCreateRowComponent } from './components/table/modal-create-row/modal-create-row.component';
import { TableElementTitlePipe } from '../_core/pipes/table-element-title.pipe';
import { UserProfileValuePipe } from "../_core/pipes/user-profile-value.pipe";
import { UserSkillsValuePipe } from "../_core/pipes/user-skills-value.pipe";
import { InfoDisplayComponent } from "./components/info-display/info-display.component";
import { ModalPlaceholderComponent } from './components/modal-placeholder/modal-placeholder.component';
import { GoalsModalComponent } from './components/goals-modal/goals-modal.component';
import {ModalService} from "../_core/services/global/modal.service";
import {ComponentLoaderService} from "../_core/services/global/component-loader.service";
import {GoalFieldsPipe} from "../_core/pipes/goal-fields.pipe";
import { NotificationsComponent } from './components/notifications/notifications.component';
import {NotificationService} from "../_core/services/notification/notification.service";
import { ClickOutsideDirective } from '../_core/directives/click-outside.directive';
import { UserInformationComponent } from './components/user-information/user-information.component';



@NgModule({
    declarations: [
        HeaderComponent,
        HasRoleDirective,
        ClickOutsideDirective,
        TableComponent,
        FooterComponent,
        SidenavComponent,
        ModalCreateRowComponent,
        InfoDisplayComponent,
        TableElementTitlePipe,
        UserProfileValuePipe,
        UserSkillsValuePipe,
        ModalPlaceholderComponent,
        GoalsModalComponent,
        GoalFieldsPipe,
        NotificationsComponent,
        UserInformationComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    HasRoleDirective,
    ClickOutsideDirective,
    TableComponent,
    FooterComponent,
    SidenavComponent,
    InfoDisplayComponent,
    UserProfileValuePipe,
    UserSkillsValuePipe,
    GoalFieldsPipe,
    UserInformationComponent
  ],
  providers: [ComponentLoaderService,]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        ModalService,
        NotificationService
      ]
    };
  }
}
