import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { AbonadosComponent } from './Components/pages/abonados/abonados.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { RegisterComponent } from './Components/pages/register/register.component';
import { ForgotPasswordComponent } from './Components/pages/forgot-password/forgot-password.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { AuthService } from './Services/Auth/auth.service';
import { inject } from '@angular/core';
import { HistorialComponent } from './Components/pages/historial/historial.component';
import { PeliculasComponent } from './Components/pages/peliculas/peliculas.component';
import { SeriesComponent } from './Components/pages/series/series.component';
import { RestorePasswordComponent } from './Components/pages/restore-password/restore-password.component';
import { VideoplayerComponent } from './Components/videoplayer/videoplayer.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[() => inject(AuthGuard).canActivate()] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'historial', component: HistorialComponent , canActivate:[() => inject(AuthGuard).canActivate()]},
  {path: 'peliculas', component: PeliculasComponent , canActivate:[() => inject(AuthGuard).canActivate()]},
  {path: 'abonados', component: AbonadosComponent , canActivate:[() => inject(AuthGuard).canActivate()]},
  {path: 'series', component: SeriesComponent, canActivate:[() => inject(AuthGuard).canActivate]},
  {path: 'restore-password', component: RestorePasswordComponent},
  {path: 'ver/:id', component: VideoplayerComponent },
  {path: 'ver-serie/:id', component: VideoplayerComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
