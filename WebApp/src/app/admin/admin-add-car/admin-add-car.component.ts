import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCars } from '../admin-cars/admin-car';
import { AdminCarsComponent } from '../admin-cars/admin-cars.component';
import { AdminService } from '../admin.service';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private adminAuth:AdminAuthService) { }

  ngOnInit(): void {
  }
  add(brand:string,model:string,priceDay:string,gear:string,fuel:string){
    this.adminService.addCar(
      { 
        brand,
        model,
        priceDay,
        gear,
        fuel
      } as AdminCars).subscribe({
        next:(value) => {
          alert("succesful")    

        },
        error:(err) =>{
          if(err.status==401){  
            alert("please login again");
            this.adminAuth.logout();
            this.router.navigate(["/admin/login"]);
}
          
        },
      })
  }
}
