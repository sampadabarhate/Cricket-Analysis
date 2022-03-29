import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(private router:Router,private auth : AuthenticationService) {}
  getValues(forminput :any={})
  {
    


    if(forminput.name === "" || forminput.email === "" || forminput.password1 === "" || forminput.password2 === "")
    {
   
    }

    else if(forminput.password1 != forminput.password2)
    {
      
    }
    else if(!(this.regexp.test(forminput.email)))
    {
      alert("Please Enter Valid Email")
    }
    else{
      console.log(forminput)
      const registerdata :any={"email":forminput.email,"name":forminput.username,"password":forminput.password1}
      this.auth.registerUser(registerdata).subscribe(res=>{console.log(res)
      this.router.navigate(['login']);
      },err=>{console.log(err)
      if(err.status==401)
      {
        alert("User already exist");
      }
      });
      
     

    }

  }

  ngOnInit(): void {
  }
}
