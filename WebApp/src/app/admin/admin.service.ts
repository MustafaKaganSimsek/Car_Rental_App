import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCars } from './admin-cars/admin-car';
import { AdminReservation } from './reservations/admin-reservation';
import { AdminAuthService } from './admin-auth.service';
import { Reservation } from '../model/reservation';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  carUrl='http://localhost:8080/admin/car';
  reservationUrl='http://localhost:8080/admin/reservation';
  constructor(private http:HttpClient,private security:AdminAuthService) { }

  getCars(){
    let headers = this.security.getHeaders();
    return this.http.get(this.carUrl,{headers});    
  }
  getCar(car: AdminCars){
    let headers = this.security.getHeaders();

    return this.http.get(this.carUrl+"/"+car.id,{headers});    
  }

  deleteCar(car: AdminCars):Observable<AdminCars>{
    let headers = this.security.getHeaders();

    return this.http.delete<AdminCars>(this.carUrl+"/delete/"+car.id,{headers});
  }

  addCar(car:AdminCars):Observable<AdminCars>{ 
    let headers = this.security.getHeaders();

    return this.http.post(this.carUrl+"/add",car,{headers});
  }

  updateCar(car:AdminCars):Observable<AdminCars>{ 
    let headers = this.security.getHeaders();

    return this.http.post(this.carUrl+"/update",car,{headers});
  }

  getRezervations():Observable<AdminReservation>{
    let headers = this.security.getHeaders();

    return this.http.get(this.reservationUrl,{headers});
  }
  deleteReservation(reservation: Reservation):Observable<Reservation>{
    let headers = this.security.getHeaders();

    return this.http.delete<Reservation>(this.reservationUrl+"/delete/"+reservation.id,{headers});
  }
}
