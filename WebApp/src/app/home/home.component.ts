import { Component, OnInit } from '@angular/core';
import { faLocationDot,faArrowRightLong,faCalendarCheck,faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faLocationDot= faLocationDot;
  faArrowRightLong=faArrowRightLong;
  faCalendarCheck=faCalendarCheck;
  faCar=faCar;
  constructor() { }

  ngOnInit(): void {
  }

}
