import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@sharedModule/shared.module';
import { REGISTER_ROUTES } from './register.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(REGISTER_ROUTES),
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class RegisterModule { }
