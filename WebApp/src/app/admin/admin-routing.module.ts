import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { AdminAddCarComponent } from './admin-add-car/admin-add-car.component';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { AdminGuardService } from './admin-guard.service';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {path:'admin/login',component:LoginComponent},
  {
    path: 'admin',
    canActivate:[AdminGuardService],
    component:AdminComponent,
    children:[{
      path:'',
      children:[
        {path:'reservations',component:ReservationsComponent},
        {path:'cars',component:AdminCarsComponent},
        {path:'cars/add',component:AdminAddCarComponent}
      
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
