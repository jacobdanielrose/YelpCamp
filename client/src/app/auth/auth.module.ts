import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { MdbMaterialModule } from '../mdb-material.module';
import { ReactiveFormsModule } from '@angular/forms'
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdbMaterialModule,
        AuthRoutingModule,
        FlexModule,

    ]
})
export class AuthModule { }
