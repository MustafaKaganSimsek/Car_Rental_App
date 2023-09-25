import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Car } from '../products/products';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservationService } from '../services/reservation.service';
import { DatePipe } from '@angular/common';
import { Reservation } from '../model/reservation';
import { ErrorService } from '../services/error.service';


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
  providers: [DatePipe],
  encapsulation:ViewEncapsulation.None

})
export class BookPageComponent implements OnInit {
  loading = true;
  car?:Car;
  id?:number;
  carId?:number;
  reservartions:Reservation[] = [];
  minDate = new Date(Date.now());
  dates: Date[] = []
  disabledDates: Date[] = [new Date("8/16/2023")];

  disabledDateFilter = (date: Date): boolean => {
     if(this.reservartions.length==0){
       return true;
     }
     else{
      let d = this.pipe.transform(date,"yyyy-MM-dd");      
      return !this.reservartions.find(x=>this.pipe.transform(x.day,"yyyy-MM-dd")===d);
     }
    
    
    
   
  }

  isSelected = (event: any):MatCalendarCellCssClasses  => {
    const date = event as Date
    
    return (this.dates.find(x => x.getTime()===date.getTime())) ? "selected" : '';
  };

  constructor(private route: ActivatedRoute,private router:Router,private service: ProductsService,private reservationService:ReservationService,private pipe:DatePipe,private error:ErrorService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.carId = +(<string>params.get('id'));
    });

    this.getRezervations();
    this.getItem();
  }

  getItem():void{
    this.service.getProduct(<number>this.carId).subscribe(
      c => {this.car=c;
        console.log(this.car);

      }
       
    );
  }

 
  
  select(event: any, calendar: any) {
    const date: Date = event
    console.log(event);

    const index = this.dates.findIndex(x => x.getTime()===date.getTime());
    if (index < 0) this.dates.push(date);
    else this.dates.splice(index, 1);
console.log(this.dates);

    calendar.updateTodaysDate();

  }

  reset(){
    const selecteds = Array.from(
      document.getElementsByClassName('selected') as HTMLCollectionOf<HTMLElement>,
    );
    
    selecteds.forEach(selected => {
      selected.classList.remove("selected");
    });
    this.dates.splice(0);
  }



  createReservation(){
    this.reservationService.createReservation(this.dates,<number>this.carId).subscribe(
      {

        next:() =>{
          alert("Succesfull");
          this.router.navigate
          return '200';
        },
        error:(err)=>{
          
          this.error.errorHandler(err,"please login again");
        }

      }
    )
  }

  getRezervations(){
    
    this.reservationService.getRezervations(<number>this.carId).subscribe({
      next:(r) =>{
        
        this.reservartions=r;
        this.loading=false;
        
      },
      error:(err) =>{
            this.error.errorHandler(err,"please login again");
          
      }
    })
  }

  
}
