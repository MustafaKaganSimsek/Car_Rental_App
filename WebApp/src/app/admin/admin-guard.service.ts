import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { Payload } from '../security/payload';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {
  payload?:Payload;

  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) { }


  canActivate():boolean {
    let token=localStorage.getItem("GOGO_ADMIN_ACCESS_TOKEN");


    if(token === null|| token === ''){
      this.authService.loggedIn=true;
      this.router.navigate(['admin/login']);
      window.alert("izniniz yok");
      return false;

    }else{

      this.payload=this.authService.decodeToken(token);
      if(this.authService.isExpired(<Date>this.payload.exp)&& this.payload.role === "ADMIN"){
        this.authService.loggedIn=true;
        return true;
      
      }else{
        this.authService.loggedIn=false;
        this.router.navigate(['admin/login']);
        return false;
      
      }
      
    }
    
  }

//   canActivate(): boolean {
//     if(this.authService.isAuthenticated()){
//       return true;
//     }
//     else{
//       window.alert("izniniz yok")
//       this.route.navigate(['admin/login']);
//       return false;
//     }
// }
}
