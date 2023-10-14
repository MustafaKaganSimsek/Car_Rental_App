import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminReservation } from './admin-reservation';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/model/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations?:Reservation[];

  constructor(private adminService:AdminService,private adminAuth:AdminAuthService,private router:Router ) { }

  ngOnInit(): void {
    this.getRezervations();
  }

  getRezervations():void{
    
      this.adminService.getRezervations().subscribe({
        next:(value) => {
          console.log(value);

          this.reservations = <Reservation[]>value;      
          
        },
        error:(err) =>{
          if(err.status==401){  
            alert("please login again");
            this.adminAuth.logout();
            this.router.navigate(["/admin/login"]);
          }
        },
      }
        
      
  )
  }
  deleteReservation(reservation:Reservation):void{
    this.reservations = this.reservations?.filter(r => r!==reservation);
    this.adminService.deleteReservation(reservation).subscribe({
      error:(err) => {
        if(err.status==401){  
          alert("please login again");
          this.adminAuth.logout();
          this.router.navigate(["/admin/login"]);
        }
      },
    }    )
  }
}
