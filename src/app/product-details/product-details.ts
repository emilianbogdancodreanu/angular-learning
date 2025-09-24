import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bot-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }

  // getDiscountedClasses(product: IProduct) {
  //   return { strikethrough: product.discount > 0 };
  // }

  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0)
      return ['strikethrough', 'bold'];
    else return '';
  }
}
