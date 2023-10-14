import { Component, OnInit } from '@angular/core';
import { AdminService} from '../admin.service';
import { AdminCars } from './admin-car';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';


@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css'],
  providers: [AdminService],

})
export class AdminCarsComponent implements OnInit {
  cars?:AdminCars[];
  inActiveCars?:AdminCars[];
  active = true;
  constructor(private adminService : AdminService,private router:Router,private adminAuth:AdminAuthService) { }


  ngOnInit(): void {
    this.getCars();
  }
  isActive(){
    if(this.active){
      this.inActiveCars= this.cars?.filter(c => c.active == false)
      this.cars = this.cars?.filter(c => c.active!=false)
      this.active=false;
    }else{
      this.cars = this.cars?.concat(<AdminCars>this.inActiveCars);
      this.active=true;
    }
  }
  getCars():void{
    this.adminService.getCars().subscribe({
      next:(value) => {
        this.cars = <[AdminCars]>value;    

      },
      error:(err)=>{
        if(err.status==401){  
          alert("please login again");
          this.adminAuth.logout();
          this.router.navigate(["/admin/login"]);
}
      },

  })
    
  }
  deleteCar(car:AdminCars):void{
    this.cars = this.cars?.filter(c => c!==car);
    this.adminService.deleteCar(car).subscribe({ 
      next:(value) => {
      alert("succesful");      

    },
    error:(err) =>{
      if(err.status==401){  
        alert("please login again");
        this.adminAuth.logout();
        this.router.navigate(["/admin/login"]);
}
      
    },}
      
    );
  }
}
