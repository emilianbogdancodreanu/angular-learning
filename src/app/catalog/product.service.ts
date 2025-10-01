import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("/api/products");
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName
  }
}
