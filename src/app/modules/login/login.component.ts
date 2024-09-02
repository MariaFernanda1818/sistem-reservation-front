import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { emailValidator } from '@common/helpers/validators/formats.validator';
import { ICliente } from '@sharedModule/models/ICliente';
import { ILoginUser } from '@sharedModule/models/ILoginClient';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';
// import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  public hide = true;
  public formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService
  ) {  }

  ngOnInit(): void {
    this.buildFormLogin();
  }

  buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      emailUser: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(120),
        Validators.email,
        emailValidator
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(StrongPasswordRegx)
      ])
    });
  }

  public loginUser({valid}:{valid:boolean}) {
    if (!valid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    const { emailUser, password } = this.formLogin.value;
    const objectClient: ILoginUser = {
      correoCliente:emailUser,
      contrasenaCliente:password,
    }
    sessionStorage.removeItem('userToken');
    this.spinner.show(); // Show Spinner
    this.authService.loginUser(objectClient).pipe(
      tap((data) => {
        if (data.error) {
          this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar');
        } else {
          this.utilitiesService.showSucessMessage(data.mensaje, 'inicio-sesion', 'Aceptar');
        }
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message)
        return of(null)
      }),
      finalize(() => this.spinner.hide() ) // Hiden Spinner
    ).subscribe();
  }
  
  // public cancelAction() {
    
  // }

}
