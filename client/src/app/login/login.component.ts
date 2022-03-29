import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  getLoginValues(loginInput:any={})
  {
    if(loginInput.email ==="" || loginInput.password1 === "")
    {
      alert("No Empty fields Allowed");
    }
    else
    {
      const logindata : any = {"email":loginInput.email,"password":loginInput.password1}
      this.auth.loginUser(logindata).subscribe(res=>{
      localStorage.setItem('token',res.token) 
      console.log(localStorage.getItem('token'))

      
      this.auth.sendValue(localStorage.getItem('token'))
      this.router.navigate(['dashboard']);
    }
      ,err=>{console.log(err)
      if(err.status === 401)
      {
        alert("Inavlid Credentials")
      }
      
      })
    }
  }

}
