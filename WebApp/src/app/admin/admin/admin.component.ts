import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminAuth:AdminAuthService, private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["/admin/reservations"]);
  }
  logout(){
    this.adminAuth.logout();
  }
}
