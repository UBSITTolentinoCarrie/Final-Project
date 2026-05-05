import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  productService = inject(ProductService);
  cartService = inject(CartService);
  selectedCategory = signal<string>('All');

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const products = this.productService.productList();
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  });

  ngOnInit() {
    this.productService.fetchProducts();
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  filterCategory(category: string) {
    this.selectedCategory.set(category);
  }

  addToCart(product: any) {
    const item = {
      productId: product._id,
      productName: product.name,
      productImage: product.image,
      price: product.price,
      quantity: 1
    };
    this.cartService.addToCart(item).subscribe({
      next: () => alert(product.name + ' added to cart!'),
      error: (err) => console.error('Add to cart failed', err)
    });
  }
}