import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdmin } from './user';
import { UserAuth } from '../security/user-auth';
import { LoginRequest } from '../login/login-request';
import { Payload } from '../security/payload';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  url = "http://localhost:8080/auth";
  loggedIn = false;
  loginRequest?:LoginRequest;
  payload?:Payload;
  user?:UserAuth;
  

  constructor(private router:Router,private http:HttpClient) { }

  
  public generateToken(request:LoginRequest) {
      
    this.http.post(this.url+"/admin/login",request,{responseType: 'text' as 'json'}).subscribe({
      next:(token) =>{
        this.payload = this.decodeToken(token);
        this.user={
          id:this.payload.sub,
          name:this.payload.name,
          email:this.payload.email,
          role:this.payload.role
        }
        localStorage.setItem("GOGO_ADMIN", JSON.stringify(this.user) );
        localStorage.setItem("GOGO_ADMIN_ACCESS_TOKEN",'Bearer '+token);
        
        this.router.navigate(['admin']);
        
        return '200';
      },
      error:(err)=>{
        
        console.log(err.status);
        return err.status;
      }
      
    });  
  }

  public logout(){
    localStorage.removeItem("GOGO_ADMIN");
    localStorage.removeItem("GOGO_ADMIN_ACCESS_TOKEN");
    this.loggedIn = false;
    this.router.navigate(['admin']);

  }

  public getUserFromToken():Payload{
    
      return JSON.parse(localStorage.getItem('GOGO_ADMIN') || '{}') ;
    
    
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
    return JSON.parse(<string>localStorage.getItem("GOGO_ADMIN")) ;

  }
  

  public getHeaders(){      
    return new HttpHeaders().set('Authorization',<string>localStorage.getItem('GOGO_ADMIN_ACCESS_TOKEN'));
  }
  
  
  
  
  
  /*isAuthenticated(){
    if(localStorage.getItem(this.key)===""||localStorage.getItem(this.key)===null){
      this.loggedIn=false;
      return this.loggedIn;
    }else{          
      return this.http.post("http://localhost:8080/admin/logged-in/"+localStorage.getItem(this.key),"").subscribe();
    }
    
  }

  login(name:string,password:string){
    this.user={
      name:name,
      password:password
    }
    this.http.post('http://localhost:8080/admin/login',this.user).subscribe(
      a=>{
        if(a!=null){
          this.currentUser=a;
          this.route.navigate(["admin"])
          localStorage.setItem(this.key,<string>this.currentUser.id?.toString());
          this.loggedIn=<boolean>this.currentUser.loggedIn;
        
          
        }else
        window.alert("yanlış şifre veya kullanıcı adı")
      }
    )
    
  }
  logout(){
    this.http.post('http://localhost:8080/admin/log-out/'+localStorage.getItem(this.key),"").subscribe(
      a=>{
        
        if(a){
          localStorage.setItem(this.key,"")
          this.loggedIn = false;
          this.route.navigate(["admin/login"])
        }
        else
          window.alert("işlem başarısız")
      }
    )
    
  }*/
}
