import { Component, OnInit} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/models/loginRequest';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  form: FormGroup; 
  user: LoginRequest = new LoginRequest();
  error:string = '';
  showMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.form= this.formBuilder.group(
      {
        mail:['', [Validators.required, Validators.email]]
      }
    )
  }

  onSubmit(event: Event, user: LoginRequest) {
    // TODO: enviar el correo
    // this.router.navigate(['/reset-password']);
    this.showMessage = true;
  }
  
}