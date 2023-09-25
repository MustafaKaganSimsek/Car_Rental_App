import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { LoginRequest } from './login-request';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest?:LoginRequest;

  constructor(private security:SecurityService,  ) { }

  ngOnInit(): void { }

  login(email:string,password:string){
    this.loginRequest={
      email:email,
      password:password
    }
    this.security.generateToken(this.loginRequest);  }
}
