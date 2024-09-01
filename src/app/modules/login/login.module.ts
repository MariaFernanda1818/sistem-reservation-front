import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '@sharedModule/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';
import { HttpClientModule } from '@angular/common/http';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { AuthService } from '@sharedModule/service/auth.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(LOGIN_ROUTES),
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class LoginModule { }
