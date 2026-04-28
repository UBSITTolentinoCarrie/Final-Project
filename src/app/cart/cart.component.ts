import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.fetchCart();
  }

  removeItem(id: string) {
    if (confirm('Remove this item from cart?')) {
      this.cartService.removeFromCart(id);
    }
  }
}