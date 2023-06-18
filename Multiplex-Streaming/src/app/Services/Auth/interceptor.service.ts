import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{

  constructor( private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.currentUserValue.Token;    
    if(token) {
      req = req.clone({
        setHeaders:{
          'Authorization':  `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
