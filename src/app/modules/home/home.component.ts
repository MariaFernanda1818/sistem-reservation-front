import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public formHomePage!: FormGroup;
  public formExample: FormGroup;

  constructor(
    private spinner: NgxSpinnerService, 
    private modalService: NgbModal,
    public utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService
  ) {
    this.formExample = this.formBuilder.group({
      correo: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(15),
        Validators.email
      ]
      ),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.pattern(StrongPasswordRegx)
      ])
    })
  }

  ngOnInit() {
    this.buildFormHomePage();
    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
      /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    //   this.utilitiesService.showInfoMessage('En construcción...', 'inicio-sesion', 'Aceptar')
    // }, 500);
    console.log("Init...");
  }

  buildFormHomePage() {
    this.formHomePage = this.formBuilder.group({
      department: new FormControl('', [Validators.required]),
      municipalitie: new FormControl('', [Validators.required])
    })
  }

  public open(modal: ISafeAny): void {
    this.modalService.open(modal);
  }

  get myControlName() {
    return this.formExample.controls['myControlName'];
  }

}
