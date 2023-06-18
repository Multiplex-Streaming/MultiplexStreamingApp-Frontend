import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  esAdmin: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin;
  }

}
