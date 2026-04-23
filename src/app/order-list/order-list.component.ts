import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  imports: [DatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.fetchOrders();
  }
}