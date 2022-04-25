import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampgroundCreateComponent } from './campgrounds/campground-create/campground-create.component';
import { CampgroundEditComponent } from './campgrounds/campground-edit/campground-edit.component';
import { CampgroundListComponent } from './campgrounds/campground-list/campground-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'campgrounds', component: CampgroundListComponent },
  { path: 'campgrounds/new', component: CampgroundCreateComponent },
  { path: 'campgrounds/edit/:campgroundId', component: CampgroundEditComponent },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
