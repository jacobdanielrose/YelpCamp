import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampgroundCreateComponent } from './campground-create/campground-create.component';
import { CampgroundListComponent } from './campground-list/campground-list.component';
import { CampgroundEditComponent } from './campground-edit/campground-edit.component';
import { CampgroundShowComponent } from './campground-show/campground-show.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampgroundCreateComponent,
    CampgroundListComponent,
    CampgroundEditComponent,
    CampgroundShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CampgroundsModule { }
