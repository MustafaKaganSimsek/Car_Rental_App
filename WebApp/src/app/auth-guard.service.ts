import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Payload } from './security/payload';
import { SecurityService } from './security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  payload?:Payload;
  constructor(private router:Router,private security:SecurityService) { }


  canActivate():boolean {
    let token=localStorage.getItem("GOGO_ACCESS_TOKEN");


    if(token === null|| token === ''){
      this.security.loggedIn=true;
      this.router.navigate(['login']);
      window.alert("izniniz yok");
      return false;

    }else{

      this.payload=this.security.decodeToken(token);
      if(this.security.isExpired(<Date>this.payload.exp)&& this.payload.role === "USER"){
        this.security.loggedIn=true;
        return true;
      
      }else{
        this.security.loggedIn=false;
        this.router.navigate(['login']);
        return false;
      
      }
      
    }
    
  }
  
      /*canActivate() {
        console.log("aheyyyyyy");
        
        if(localStorage.getItem(this.authService.key)===""||localStorage.getItem(this.authService.key)===null){
          this.authService.loggedIn=false;
          window.alert("izniniz yok")
          this.router.navigate(['login']);
          return this.authService.loggedIn;
        }else{return this.authService.isAuthenticated().then((authenticated)=>{
          if(authenticated){
            console.log(authenticated);
            this.authService.loggedIn=true;
            return true;
          }
          else{
            window.alert("izniniz yok")
            this.router.navigate(['login']);
            return false;
          }
        }).catch()
      }
    }*/
  
}
