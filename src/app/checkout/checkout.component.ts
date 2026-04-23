import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  cartService = inject(CartService);
  orderService = inject(OrderService);

  checkoutForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required]
  });

  ngOnInit() {
    this.cartService.fetchCart();
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    const order = {
      items: this.cartService.cartItems(),
      totalAmount: this.cartService.cartTotal(),
      status: 'pending',
      shippingAddress: this.checkoutForm.getRawValue(),
      createdAt: new Date().toISOString()
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.cartService.cartItems().forEach(item => {
          this.cartService.removeFromCart(item._id);
        });
        this.checkoutForm.reset();
      },
      error: (err) => console.error('Order failed', err)
    });
  }
}