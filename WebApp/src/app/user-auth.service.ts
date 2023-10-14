import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  previousUrl?:string;
  currentUrl?:string;
  // loggedIn = false;
  user?:User;
  currentUser?:User;
  key = "user_id";



  constructor(private router:Router,private http:HttpClient) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
   }
   isAuthenticated(){
   
      const promise = new Promise((resolve,rejects)=>{
      setTimeout(
        ()=>{this.http.get("http://localhost:8080/user/logged-in/"+localStorage.getItem(this.key)).subscribe(
          r => resolve(r)
        )},700
      )
    })
    return promise;
     
  }
  getPreviousUrl(){
    return this.previousUrl;
  } 
  login(email:string,password:string){
    this.user={
      email:email,
      password:password
    }
    this.http.post('http://localhost:8080/user/login',this.user).subscribe(
      u =>{
        if(u!=null){
          this.currentUser=u;
          localStorage.setItem(this.key,<string>this.currentUser.id?.toString());
          localStorage.setItem("loggedIn","true");
          // this.loggedIn=<boolean>this.currentUser.loggedIn;
          this.router.navigate([this.previousUrl]);
        }
        
        else{
          window.alert("yanlış şifre veya kullanıcı adı")
        }
      }
    )
  }

  logout(){
    this.http.post('http://localhost:8080/user/log-out/'+localStorage.getItem(this.key),"").subscribe(
      a=>{
        
        if(a){
          localStorage.setItem(this.key,"")
          // this.loggedIn = false;
          localStorage.setItem("loggedIn","false");
          this.router.navigate(["home"]);
        }
        else
          window.alert("işlem başarısız")
      }
    )

  }

  // signUp(email:string,name:string,password:string,password1:string){
  //   if(password===password1){
  //     this.user={
  //       email:email,
  //       password:password,
  //       name:name
  //     }
  //     this.http.post('http://localhost:8080/user/sign-up',this.user).subscribe();
  
  //   }
  //   else
  //   window.alert("hatalı form");
  // }
  getUser():Observable<User>{
    return this.http.get('http://localhost:8080/user/'+localStorage.getItem(this.key));

  }
}

