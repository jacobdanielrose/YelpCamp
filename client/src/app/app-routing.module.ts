import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CampgroundComponent } from './campground/campground.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'campgrounds', component: IndexComponent },
  { path: 'campground/:campgroundId', component: CampgroundComponent },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
