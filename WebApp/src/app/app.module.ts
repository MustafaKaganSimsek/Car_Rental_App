import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerSliderComponent } from './banner-slider/banner-slider.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { FilterComponent } from './filter/filter.component';
import { ContactComponent } from './contact/contact.component';
import {HttpClientModule} from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {MatDatepickerModule,MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BannerSliderComponent,
    FooterComponent,
    ProductsComponent,
    FilterComponent,
    ContactComponent,
    LoginComponent,
    SignUpComponent,
    BookPageComponent,
    ReservationsComponent,
    UpdateCarComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    HttpClientModule,
    AdminModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
