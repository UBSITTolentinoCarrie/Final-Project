import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/cart';

  cartItems = signal<any[]>([]);
  cartTotal = signal<number>(0);

  fetchCart() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.cartItems.set(data);
        const total = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.set(parseFloat(total.toFixed(2)));
      });
  }

  addToCart(item: any) {
    return this.http.post(this.apiUrl, item);
  }

  updateQuantity(id: string, quantity: number) {
    return this.http.put(`${this.apiUrl}/${id}`, { quantity });
  }

  removeFromCart(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() =>
        this.cartItems.update(list => list.filter(c => c._id !== id))
      );
  }
}