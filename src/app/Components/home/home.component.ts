import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/service/api.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
      this.api.getProducts().subscribe(
        res => {
          this.products = res.oblist;
        }
      );
  }

  addToCart(e) {
    this.api.addCartItems(e).subscribe(res => {
      console.log(res)
    })
  }
  

}
