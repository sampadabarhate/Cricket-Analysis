import { Injectable,Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector :Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let authservice =this.injector.get(AuthenticationService)
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization :`Bearer ${authservice.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
  }
}
