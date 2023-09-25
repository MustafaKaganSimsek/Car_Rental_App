import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Car } from '../model/car';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cars?:Car[];
  constructor(private products:ProductsService ) {
   }

  ngOnInit(): void {
    this.getProducts();
    
  }
  getProducts():void{
    this.products.getProducts().subscribe(response =>{
      this.cars = <[Car]>response;
    })

  }
}
