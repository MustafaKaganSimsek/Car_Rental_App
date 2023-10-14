import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';
import { LoginRequest } from 'src/app/login/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest?:LoginRequest;

  constructor(private adminAuth:AdminAuthService,private route:Router) { }

  ngOnInit(): void {
    // if(this.adminAuth.isAuthenticated()){
    //   this.route.navigate(["admin"]);
    // }
  }

  login(email:string,password:string){
    this.loginRequest={
      email:email,
      password:password
    }
    this.adminAuth.generateToken(this.loginRequest);  }

}
