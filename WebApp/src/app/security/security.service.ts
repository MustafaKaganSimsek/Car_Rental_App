import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../login/login-request';
import jwtDecode from 'jwt-decode';
import { Payload } from './payload';
import { UserAuth } from './user-auth';
import { Router } from '@angular/router';
import { User } from '../user';

@Injectable({
    providedIn: 'root'
  })
  export class SecurityService {
    url = "http://localhost:8080/auth";
    loggedIn = false;
    loginRequest?:LoginRequest;
    payload?:Payload;
    userAuth?:UserAuth;
    user?:User;
    constructor(private http:HttpClient,private router:Router) { }
  
    
  
    public generateToken(request:LoginRequest) {
      
      this.http.post(this.url+"/user/login",request,{responseType: 'text' as 'json'}).subscribe({
        next:(token) =>{
          this.payload = this.decodeToken(token);
          this.userAuth={
            id:this.payload.sub,
            name:this.payload.name,
            email:this.payload.email,
            role:this.payload.role
          }
          localStorage.setItem("GOGO_USER", JSON.stringify(this.userAuth) );
          localStorage.setItem("GOGO_ACCESS_TOKEN",'Bearer '+token);
          
          this.router.navigate(['home']);
          
          return '200';
        },
        error:(err)=>{
          
          console.log(err.status);
          return err.status;
        }
        
      });  
    }

    public signUp(email:string,name:string,password:string,password1:string){
      if(password===password1){
        this.user={
          email:email,
          password:password,
          name:name
        }
        this.http.post(this.url+'/user/register',this.user).subscribe();

        this.router.navigate(['home']);
    
      }
      else
      window.alert("hatalı form");
    }

    public logout(){
      localStorage.removeItem("GOGO_USER");
      localStorage.removeItem("GOGO_ACCESS_TOKEN");
      this.loggedIn = false;
      this.router.navigate(['home']);

    }

    public getUserFromToken():Payload{
      
        return JSON.parse(localStorage.getItem('GOGO_USER') || '{}') ;
      
      
    }

    public decodeToken(token:any):Payload{
      return jwtDecode(token);
    }

    public isExpired(date:Date):boolean{
      if(date.getTime<=Date.now){
        return false;
      }
      else{
        return true;
      }
    }

    public getValidateUser():UserAuth{
      return JSON.parse(<string>localStorage.getItem("GOGO_USER")) ;

    }
    
  
    public getHeaders(){      
      return new HttpHeaders().set('Authorization',<string>localStorage.getItem('GOGO_ACCESS_TOKEN'));
    }

    public isLoggedIn(){
      if(localStorage.getItem("GOGO_USER")!=null && localStorage.getItem("GOGO_ACCESS_TOKEN")!=null ){
        return true;
      }
      else{
        return false;
      }
    }

  }