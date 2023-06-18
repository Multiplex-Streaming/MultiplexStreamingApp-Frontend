import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from 'src/app/Services/Auth/auth.guard';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { HistorialComponent } from './historial/historial.component';
import { PeliculasComponent } from './peliculas/peliculas.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HistorialComponent,
    PeliculasComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HistorialComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AuthGuard, AuthService]
})

export class PagesModule { }
