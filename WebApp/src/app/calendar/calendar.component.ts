import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CalendarComponent implements OnInit {

  constructor(private reservationService:ReservationService) {}

  ngOnInit(): void {
   
  }
  public dateValues: Date[] = [new Date('1/1/2020'), new Date('1/15/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
  public dateValue: Date[] = [new Date('1/11/2020'), new Date('1/10/2020'), new Date('1/5/2020'), new Date('1/20/2020')];
  public multiSelect: Boolean = true;
  

  disabledDate(args : any): void {
    
    this.dateValue.forEach(a =>{
      
      
      if(args.date.getTime() === a.getTime()){
        console.log(args.date);
      console.log(a+"sdsdgsgd");
        args.isDisabled = true;
      }else{
        console.log("aa");
        
      }
    } )
   
 }
} 
