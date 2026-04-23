import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/orders';

  orderList = signal<any[]>([]);

  fetchOrders() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => this.orderList.set(data));
  }

  placeOrder(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}