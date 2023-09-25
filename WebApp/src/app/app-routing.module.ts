import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { BookPageComponent } from './book-page/book-page.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignUpComponent } from './sign-up/sign-up.component';



const routes: Routes = [
  {path: '', redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent  },
  {path:'login',component:LoginComponent},
  {path:'reservations',
  canActivate:[AuthGuardService],
  component:ReservationsComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'cars',component:ProductsComponent,
    children:[
      {path:':id',
      canActivate:[AuthGuardService],
      component:BookPageComponent}
    ]  
},
  {path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
