import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products;

  getProducts() {
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

}
