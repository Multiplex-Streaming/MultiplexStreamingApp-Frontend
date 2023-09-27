import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './Services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Multiplex-Streaming';

  total = 500;
  args = {
    speed: [1, 2],
    size: 1.2,
  }
  default_height = window.innerHeight;
  default_width = window.innerWidth;

  constructor(private authService: AuthService) {   }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.default_height = window.innerHeight;
      this.default_width = window.innerWidth;
    });
  }

  public get esAdmin () {
    return this.authService.esAdmin;
  }
}

