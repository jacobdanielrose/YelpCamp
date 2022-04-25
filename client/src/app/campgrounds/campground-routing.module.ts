import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampgroundCreateComponent } from "./campground-create/campground-create.component";
import { CampgroundEditComponent } from "./campground-edit/campground-edit.component";
import { CampgroundListComponent } from "./campground-list/campground-list.component";
import { CampgroundShowComponent } from "./campground-show/campground-show.component";


const routes: Routes = [
    { path: '', component: CampgroundListComponent },
    { path: 'campgrounds/new', component: CampgroundCreateComponent },
    { path: 'edit', component: CampgroundEditComponent },
    { path: 'show', component: CampgroundShowComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CampgroundRoutingModule { }