import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { RegisterComponent } from './Components/pages/register/register.component';
import { ForgotPasswordComponent } from './Components/pages/forgot-password/forgot-password.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { AuthService } from './Services/Auth/auth.service';
import { inject } from '@angular/core';
import { HistorialComponent } from './Components/pages/historial/historial.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'historial', component: HistorialComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
