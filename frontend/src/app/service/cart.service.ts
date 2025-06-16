import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8000/panier/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${encodeURIComponent(userId)}`).pipe(
      map((cart: any) => {
        if (cart && cart._id) {
          delete cart._id;
        }
        return cart;
      })
    );
  }

  addToCart(userId: string, product: Product): Observable<any> {
    const url = `${this.baseUrl}/${userId}/add`;
    const cartItem = {
      product_id: product.id,
      volume: product.quantite || 1,
      name: product.name,
      price: product.price,
    };
    return this.http.post(url, cartItem);
  }
}
