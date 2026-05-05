import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  editId = signal<string | null>(null);

  productForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    category: ['', Validators.required],
    tag: [''],
    image: ['']
  });

  ngOnInit() {
    this.productService.fetchProducts();
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    const data = this.productForm.getRawValue();
    const id = this.editId();

    if (id) {
      this.productService.updateProduct(id, data).subscribe({
        next: () => {
          this.productService.fetchProducts();
          this.cancelEdit();
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.productService.saveProduct(data).subscribe({
        next: () => {
          this.productService.fetchProducts();
          this.productForm.reset();
        },
        error: (err) => console.error('Save failed', err)
      });
    }
  }

  startEdit(product: any) {
    this.editId.set(product._id);
    this.productForm.patchValue(product);
  }

  cancelEdit() {
    this.editId.set(null);
    this.productForm.reset();
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }
}