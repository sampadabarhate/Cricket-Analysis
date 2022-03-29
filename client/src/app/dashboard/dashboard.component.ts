import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'))
    this.auth.value$
    .subscribe((message)=>{
    console.log(message,"this is from dashboard")
    let data ={"token":message}
    this.auth.details(data).subscribe(res=>alert("hi")
    )
  })
  }
}
