import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { IProduct } from '../catalog/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../catalog/product.service';

@Component({
  selector: 'bot-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  constructor(
    private cartSvc: CartService,
    private prodSvc: ProductService
  ) { }

  get cartItems() {
    return this.cartSvc.cart();
  }

  get cartTotal() {
    return this.cartSvc.cartTotal();
  }

  removeFromCart(product: IProduct) {
    this.cartSvc.remove(product);
  }

  getImageUrl(product: IProduct) {
    return this.prodSvc.getImageUrl(product);
  }
}
