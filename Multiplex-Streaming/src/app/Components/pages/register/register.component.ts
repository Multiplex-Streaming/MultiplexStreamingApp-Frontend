import { Component } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/registerRequest';
import { RegisterService } from 'src/app/Services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup; 
  newUser: RegisterRequest = new RegisterRequest();
  registering: Boolean = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
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
    if (this.form.valid) {
      this.registering = true;
      this.registerService.create(newUser).subscribe({
        next: data => {  
          if (data) {
            alert('El usuario ha sido registrado con éxito')
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
        },
        error: error => {
          this.registering = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
