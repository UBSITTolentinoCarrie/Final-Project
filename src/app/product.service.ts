import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  productList = signal<any[]>([]);

  fetchProducts() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => this.productList.set(data));
  }

  saveProduct(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() =>
        this.productList.update(list => list.filter(p => p._id !== id))
      );
  }
}