import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CommonModule } from '@angular/common';
import { ProductDetails } from '../product-details/product-details';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  imports: [CommonModule, ProductDetails, RouterLink, RouterLinkActive],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  products: any;
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] ?? ''; 
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products?.filter((product: any) => product?.category == this.filter);
  }
}
