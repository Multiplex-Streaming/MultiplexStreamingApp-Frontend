import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  estaAutenticado:boolean=false;

  constructor(private authService: AuthService,private router: Router) {  }

  ngOnInit(): void {
    this.authService.estaAutenticado.subscribe(res=>(this.estaAutenticado=res));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  admin(): boolean {
    let admin = false;
    this.authService.esAdmin.subscribe(res=>(admin=res));
    return admin;
  }
}
