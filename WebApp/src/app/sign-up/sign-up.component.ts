import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private security:SecurityService ) { }

  ngOnInit(): void {
  }
  signUp(email:string,name:string,password:string,password1:string){
    this.security.signUp(email,name,password,password1);
  }
}
