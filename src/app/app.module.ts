import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthService } from './_services/auth.service';
import { CommonService } from './_services/common.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_shared/shared.module';

import { HttpRequestInterceptor } from './HttpRequestInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule
  ],
  providers: [
    AuthService,
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
