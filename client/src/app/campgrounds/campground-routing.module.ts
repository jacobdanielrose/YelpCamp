import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampgroundCreateComponent } from "./campground-create/campground-create.component";
import { CampgroundEditComponent } from "./campground-edit/campground-edit.component";
import { CampgroundListComponent } from "./campground-list/campground-list.component";
import { CampgroundShowComponent } from "./campground-show/campground-show.component";


const routes: Routes = [
    {
        path: 'campgrounds',
        component: CampgroundListComponent,
        children: [
            {
                path: 'edit/:campId',
                component: CampgroundEditComponent
            },
            {
                path: 'new',
                component: CampgroundCreateComponent
            },
            {
                path: ':campId',
                component: CampgroundShowComponent
            }
        ]
    },
    //{ path: 'campgrounds/new', component: CampgroundCreateComponent },
    //{ path: 'edit/:campgroundId', component: CampgroundEditComponent },
    //{ path: 'show', component: CampgroundShowComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CampgroundRoutingModule { }