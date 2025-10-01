import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CommonModule } from '@angular/common';
import { ProductDetails } from '../product-details/product-details';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'bot-catalog',
  imports: [CommonModule, ProductDetails, RouterLink, RouterLinkActive],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  products: Observable<IProduct[]> = this.productSvc.getProducts();
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] ?? ''; 
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    console.log(this.filter + "test");
    return this.filter === ''
      ? this.products
      : this.products.pipe(map(p => p.filter(product => product.category == this.filter)));
  }
}
