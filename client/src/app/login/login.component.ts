import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logArry :any=[]
  passed : boolean = false
  constructor(private router:Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  
  getLoginValues(loginInput:any={})
  {
   
  
      const logindata : any = {"email":loginInput.email,"password":loginInput.password1}
      this.auth.loginUser(logindata).subscribe(res=>{
      localStorage.setItem('token',res.token) 
      localStorage.setItem('expiryTime',res.expiryTime)

      console.log(localStorage.getItem('token'))

      
      //this.auth.sendValue(localStorage.getItem('token'))
      this.router.navigate(['dashboard']);
    }
      ,err=>{console.log(err)
      if(err.status === 401)
      {
        this.passed=true
      }
      
      })
    
  }

}
