import { HttpClient } from "@angular/common/http";
import { SecurityService } from "../security/security.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  private reservationUrl='http://localhost:8080/reservation';

  constructor(private http:HttpClient,private security:SecurityService) { }

  public createReservation(days:Date[],carId:number):Observable<Reservation>{
    let headers = this.security.getHeaders();
    return this.http.post(this.reservationUrl+"/car/"+carId,days,{headers});  }

  public getRezervations(carId:number):Observable<any>{
    let headers = this.security.getHeaders();
    return this.http.get(this.reservationUrl+"/"+carId,{headers});
  }

  deleteReservation(reservation:Reservation):Observable<Reservation>{
    let headers = this.security.getHeaders();
    return this.http.delete<Reservation>(this.reservationUrl+"/delete/"+reservation.id,{headers});
  }
}

