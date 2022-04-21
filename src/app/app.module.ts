import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { CampgroundsComponent } from './campgrounds/campgrounds.component';
import { CampgroundCreateComponent } from './campgrounds/campground-create/campground-create.component';
import { CampgroundListComponent } from './campgrounds/campground-list/campground-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './campgrounds/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    CampgroundsComponent,
    CampgroundCreateComponent,
    CampgroundListComponent,
    NavbarComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
