import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';
import { SecurityService } from './security/security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  carUrl='http://localhost:8080/car';
  reservationUrl='http://localhost:8080/reservation';
  constructor(private http:HttpClient,private security:SecurityService) { }
  getProducts(){
    return this.http.get(this.carUrl);    
  }

  getProduct(id:number){
    let headers = this.security.getHeaders();
    return this.http.get(this.carUrl+"/"+id,{headers});
  }
  
  makeReservation(reservation:Reservation):Observable<Reservation>{   
    let headers = this.security.getHeaders();
    return this.http.post(this.reservationUrl+"/create",reservation,{headers});
  }
  deleteReservation(reservation:Reservation):Observable<Reservation>{
    let headers = this.security.getHeaders();

    return this.http.delete<Reservation>(this.reservationUrl+"/delete/"+reservation.id,{headers});
  }
  getRezervations():Observable<Reservation>{
    let headers = this.security.getHeaders();
    return this.http.get(this.reservationUrl,{headers});
  }
}
