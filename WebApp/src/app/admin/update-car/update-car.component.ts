import { Component, OnInit } from '@angular/core';
import { AdminCars } from '../admin-cars/admin-car';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }
  update(brand:string,model:string,priceDay:string,priceHour:string,priceMonth:string,gear:string,fuel:string){
    this.adminService.addCar(
      { 
        brand,
        model,
        priceDay,
        priceHour,
        priceMonth,
        gear,
        fuel
      } as AdminCars).subscribe(a=> window.alert("başarılı"))
  }
 
}
