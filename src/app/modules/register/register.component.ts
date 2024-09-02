import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { alphanumeric, emailValidator, onlyLetters, onlyNumbers } from '@common/helpers/validators/formats.validator';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { IUserRegister } from '@sharedModule/models/IUserRegister';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICliente } from '@sharedModule/models/ICliente';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public hidePassword = true;
  public hideConfirmPassword = true;
  public formRegister!: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService
  ) {  }

  ngOnInit(): void {
    this.buildFormRegister();
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      emailUser: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(120),
        Validators.email,
        emailValidator
      ]
      ),
      passwordUser: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.matchPasswordValidator()
      ]),
      namesUser: new FormControl<string>('', [Validators.required, onlyLetters]),
      lastNamesUser: new FormControl<string>('', [Validators.required, onlyLetters])
    });
  }

  // Función de validación personalizada para verificar si las contraseñas coinciden
  private matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: ISafeAny } | null => {
      const password = this.formRegister?.get('passwordUser')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { notSame: true };
    };
  }


  // Método para facilitar el acceso a los controles del formulario
  get f() { return this.formRegister.controls; }

  public registerUser({valid}:{valid:boolean}) {
    if (!valid) {
      this.formRegister.markAllAsTouched();
      return;
    }
    const { emailUser, numberDocumentUser, passwordUser, namesUser, lastNamesUser, phoneNumber } = this.formRegister.value;
    const objetUser: ICliente = {
      codigoCliente: '',
      correoCliente: emailUser,
      nombreCliente: namesUser,
      apellidoCliente: lastNamesUser,
      contrasenaCliente: passwordUser
    }

    this.spinner.show(); // Show Spinner
    this.authService.registerNewUser(objetUser).pipe(
      tap((data) => {
        if (data.error) {
          this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar')
        } else {
          this.utilitiesService.showSucessMessage(data.mensaje, 'inicio-sesion', 'Aceptar')
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

}
