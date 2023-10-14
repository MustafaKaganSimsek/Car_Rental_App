import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { AdminAddCarComponent } from './admin-add-car/admin-add-car.component';
import { LoginComponent } from './login/login.component';
import { UpdateCarComponent } from './update-car/update-car.component';


@NgModule({
  declarations: [
    AdminComponent,
    ReservationsComponent,
    AdminCarsComponent,
    AdminAddCarComponent,
    LoginComponent,
    UpdateCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
    
  ]
})
export class AdminModule { }
