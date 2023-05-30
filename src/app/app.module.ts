import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './_shared/shared.module';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';
import { TOASTR_CONFIG } from './_core/constants/constants';

import { AppComponent } from './app.component';

import { JwtInterceptor } from './_core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_core/interceptors/error.interceptor';
import {ContentHostDirective} from "./_core/directives/content-host.directive";
import {SidedropdownComponent} from "./_shared/components/sidedropdown/sidedropdown.component";
import {SidebarHoverClassDirective} from "./_core/directives/SidebarHoverClass.directive";


@NgModule({
  declarations: [AppComponent,
    SidedropdownComponent,
    ContentHostDirective,
    SidebarHoverClassDirective,
    ],
imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(TOASTR_CONFIG),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
