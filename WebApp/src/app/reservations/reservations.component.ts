import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Reservation } from '../model/reservation';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations?:Reservation[];
  constructor(private service:ProductsService,private error:ErrorService) { }

  ngOnInit(): void {
    this.getReservations();
  }
  deleteReservation(reservation:Reservation):void{
    this.reservations = this.reservations?.filter(r => r!==reservation);
    this.service.deleteReservation(reservation).subscribe(    )
  }
  getReservations():void{
    
    this.service.getRezervations().subscribe({
      next:(value) =>{
        this.reservations = <[Reservation]>value;    
        console.log(this.reservations);

      },
      error:(err) => {
          this.error.errorHandler(err,"please login again");
      },

    })
}
}
