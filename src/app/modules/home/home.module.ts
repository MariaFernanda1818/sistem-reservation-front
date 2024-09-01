import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@sharedModule/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(HOME_ROUTES),
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  providers: []
})
export class HomeModule { }
