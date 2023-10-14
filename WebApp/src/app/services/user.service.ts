import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserAuth } from '../security/user-auth';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?:User;
  currentUser?:User;
  constructor(private http:HttpClient,private security:SecurityService) { }
  
  getUser():UserAuth{
    return this.security.getValidateUser();

  }
}