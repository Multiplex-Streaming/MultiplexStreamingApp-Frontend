import { Component, OnInit} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { RestorePasswordModel } from 'src/app/models/restorePasswordModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent {

  form: FormGroup; 
  user: RestorePasswordModel = new RestorePasswordModel();
  error:string = '';
  showMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.form= this.formBuilder.group(
      {
        newPassword:['',[Validators.required, Validators.minLength(1)]],
        confirmPassword:['',[Validators.required, Validators.minLength(1)]]
      }
    )
  }

  onSubmit(event: Event, user: RestorePasswordModel) {
    // TODO: integrar servicio que cambia la contraseña
    setTimeout(this.goToLogin.bind(this), 1000);
    this.showMessage = true;
  }

  goToLogin () {
    this.router.navigate(['/login']);
  }
  
}