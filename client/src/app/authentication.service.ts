import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerurl = "http://localhost:3000/api/register"
  private loginurl = "http://localhost:3000/api/login"
  private detailsurl = "http://localhost:3000/api/dashboard"
  private calendarurl="http://localhost:3000/api/calendar"
  private performanceurl="http://localhost:3000/api/getperformance"
  private bowlingurl = "http://localhost:3000/api/getbowling"
  private statsurl ="http://localhost:3000/api/getstats"
  constructor(private http:HttpClient) { }
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
  bowlingdetail()
  {
    return this.http.get<any>(this.bowlingurl)
  }
  getStatistics()
  {
    return this.http.get<any>(this.statsurl)
  }
  showPerformance()
  {
    return this.http.get<any>(this.performanceurl)
  }
  calendar()
  {
    return this.http.get<any>(this.calendarurl)
  }
  loggedIn()
  {
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

}
