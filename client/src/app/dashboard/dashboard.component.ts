import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public details :any
  constructor(private router:Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
    // this.auth.value$
    // .subscribe((message)=>{
    // console.log(message,"this is from dashboard")
    // let data ={"token":message}
    // this.auth.details(data).subscribe(res=>alert("hi")
    // )
  //})
  this.auth.details().subscribe(res=>{
    this.details = res
    console.log(this.details)
  })

  }
}

