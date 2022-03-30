import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedinUser = new Subject<String>();
  value$ = this.loggedinUser.asObservable();
  private registerurl = "http://localhost:3000/api/register"
  private loginurl = "http://localhost:3000/api/login"
  private detailsurl = "http://localhost:3000/api/dashboard"
  constructor(private http:HttpClient) { }
  // sendValue(Value:any)
  // {
  //   console.log(Value,"This is from service")
  //   this.loggedinUser.next(Value)
  // }
  registerUser(user:any)
  {
    return this.http.post<any>(this.registerurl,user)
  }
  loginUser(user:any)
  {
    return this.http.post<any>(this.loginurl,user)
    
  }
  details()
  {
    return this.http.get<any>(this.detailsurl)
  }
  loggedIn()
  {
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

}
