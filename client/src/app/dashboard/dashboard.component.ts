import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public details :any
  public calendar:any =[]
  public bowlingdetail :any
  public ifcalendar :boolean =false
  public ifbowling :boolean =false
  constructor(private router:Router,private auth:AuthenticationService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    let expiryTime = localStorage.getItem('expiryTime')
    let Time = Number(expiryTime)
    console.log(expiryTime)
    setTimeout(()=>{localStorage.clear(),this.router.navigate(['login'])},Time)
    
  this.auth.details().subscribe(res=>{
    console.log(res)
    if(res.error)
    {
      console.log(res)
      localStorage.clear()
      this.router.navigate(['login'])
    }
    this.details = res
    console.log(this.details)
  },err=>{console.log(err)})

  this.auth.calendar().subscribe(res=>{
    this.ifcalendar=true
     this.calendar =res
     this.ifcalendar=true
    console.log(res)
  },err=>{console.log(err)})

  this.auth.bowlingdetail().subscribe(res=>{
    this.bowlingdetail = res
    this.ifbowling=true
    console.log(this.bowlingdetail)
  },err=>{console.log(err)})

  }
  logout()
  {
    localStorage.clear()
    this.router.navigate(['login'])
  }
  
}

