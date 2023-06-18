import { Component, OnInit} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/models/loginRequest';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup; 
  user: LoginRequest = new LoginRequest();
  error:string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.form= this.formBuilder.group(
      {
        mail:['', [Validators.required, Validators.email]]   ,
        password:['',[Validators.required, Validators.minLength(1)]]
      }
    )
  }

  onSubmit(event: Event, user: LoginRequest) {
    if (this.form.valid) {
      this.authService.login(this.user).subscribe({
        next: data => {  
          if (this.authService.estaAutenticado) {
            this.router.navigate(['/home']);
          }
        },
        error: error => {
          this.error = error;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  
}


