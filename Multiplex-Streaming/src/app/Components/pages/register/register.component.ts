import { Component } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup; 
  newUser: RegisterRequest = new RegisterRequest();

  constructor(private formBuilder: FormBuilder) {

    this.form= this.formBuilder.group(
      {
        mail:['', [Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(1)]],
        name:['',[Validators.required, Validators.minLength(1)]],
        surname:['',[Validators.required, Validators.minLength(1)]]
        
      }
    )
  }

  onSubmit(event: Event, newUser: RegisterRequest) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(newUser));
  }
}
