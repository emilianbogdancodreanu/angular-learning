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
  products: Observable<IProduct[]> = new Observable<IProduct[]>();
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.productSvc.getProducts();

    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] ?? '';
      if (this.filter === '')
        this.products = this.products;
      else
        this.products = this.products.pipe(map((items) => items.filter((product) => product.category === this.filter)));
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }
}
