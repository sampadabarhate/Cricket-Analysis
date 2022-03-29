import { Injectable } from '@angular/core';
import {  Router,CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice :AuthenticationService,private router : Router ){

  }
  canActivate():boolean    
  {
    if(this.authservice.loggedIn())
    {
      return true
    }
    else
    {
      this.router.navigate(['login'])
      return false
    }
  }
}
