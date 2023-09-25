import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { SwiperComponent } from "swiper/angular";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);


@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class BannerSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
