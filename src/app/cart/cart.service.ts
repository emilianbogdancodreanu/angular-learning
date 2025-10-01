import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<IProduct[]>([]);

  constructor (private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (result) => this.cartItems.update(() => result)
    });
  }

  get cart() {
    return this.cartItems.asReadonly();
  }

  add(product: IProduct) {
    this.cartItems.update((currCart) => [...currCart, product]);

    this.http.post("/api/cart", this.cartItems()).subscribe(() => {
      console.log(`added ${product.name} to the cart`);
    });
  }

  remove(product: IProduct) {
    this.cartItems.update((currCart) => currCart.filter(elem => elem !== product));

    this.http.post("/api/cart", this.cartItems()).subscribe(() => {
      console.log(`removed ${product.name} from the cart`);
    });
  }

  get cartTotal() {
    return computed(() => this.cartItems().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0));
  }
}
