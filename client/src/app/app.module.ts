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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampgroundEditComponent } from './campgrounds/campground-edit/campground-edit.component';
import { CampgroundShowComponent } from './campgrounds/campground-show/campground-show.component';
import { HomeComponent } from './home/home.component';
import { AnimationComponent } from './home/animation/animation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MdbMaterialModule } from './mdb-material.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CampgroundsComponent,
    NavbarComponent,
    MapComponent,
    HomeComponent,
    AnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    MdbMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
