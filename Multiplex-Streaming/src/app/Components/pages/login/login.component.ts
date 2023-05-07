import { Component } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup; 
  user: LoginRequest = new LoginRequest();

  constructor(private formBuilder: FormBuilder) {

    this.form= this.formBuilder.group(
      {
        mail:['', [Validators.required, Validators.email]]   ,
        password:['',[Validators.required, Validators.minLength(1)]]
        
      }
    )
  }

  onSubmit(event: Event, user: LoginRequest) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(user));
  }
}


