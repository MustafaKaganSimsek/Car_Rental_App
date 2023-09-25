import { Injectable } from "@angular/core";
import { SecurityService } from "../security/security.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class ErrorService{
  
    constructor(private security:SecurityService,private router:Router) { }
    
    
    public errorHandler(err:any,message:String){
        switch (err.status) {
            case 401:{
                alert(message)
                this.security.logout();
                this.router.navigate(["login"])

                break;
            }
            case 400:{
                alert(err.message)
                break;
            }
            
            default:{
                break;
            }
            
        }
    }
    
  }