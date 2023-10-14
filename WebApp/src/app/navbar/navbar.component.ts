import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserAuthService } from '../user-auth.service';
import { UserService } from '../services/user.service';
import { UserAuth } from '../security/user-auth';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?:User;
  userAuth?:UserAuth;

  constructor(private router:Router,private userService:UserService,private security:SecurityService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedIn();
    
      this.route.url.subscribe(([url]) => {
        const { path, parameters } = url;
        // console.log(path); // e.g. /products
        // console.log(parameters); // e.g. { id: 'x8klP0' }
      });
       
  }
  loginPage(){
    this.router.navigate(["login"]);
  }
  signUpPage(){
    this.router.navigate(["sign-up"]);
  }

  loggedIn(){    
    if(this.security.isLoggedIn()){
      this.getUser()
      return true;
    }
    else{
      return false;
    }
  }

  getUser(){
      this.userAuth = this.userService.getUser();
      this.user= {
        name:this.userAuth.name,
        email:this.userAuth.email
      }      
    
  }
  logOut(){
    
    this.security.logout();
  }
}
