import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

const SCHOOL_SUPPLIES = [
  // ── WRITING SUPPLIES ──────────────────────────────────────────
  {
    _id: 'local-001', name: 'Ballpoint Pen Set (12pcs)', category: 'Writing Supplies',
    description: 'Smooth-writing ballpoint pens in assorted colors. Ideal for everyday note-taking and schoolwork.',
    price: 89.00, stock: 200,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&fit=crop'
  },
  {
    _id: 'local-002', name: 'Mechanical Pencil 0.5mm', category: 'Writing Supplies',
    description: 'Ergonomic mechanical pencil with a non-slip grip. Includes 3 refill lead tubes.',
    price: 55.00, stock: 150,
    image: 'https://images.unsplash.com/photo-1595073752359-ab94b8438ff3?w=400&fit=crop'
  },
  {
    _id: 'local-003', name: 'Felt-Tip Markers (24pcs)', category: 'Writing Supplies',
    description: 'Vibrant, water-based markers perfect for art projects and posters. Non-toxic and washable.',
    price: 149.00, stock: 120,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&fit=crop'
  },
  {
    _id: 'local-004', name: 'Highlighter Set (6 colors)', category: 'Writing Supplies',
    description: 'Chisel-tip fluorescent highlighters for color-coded studying. Fade-resistant and quick-drying.',
    price: 79.00, stock: 180,
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&fit=crop'
  },
  {
    _id: 'local-005', name: 'Correction Tape', category: 'Writing Supplies',
    description: 'Compact correction tape roller with clean, dry coverage. No smearing, no drying time needed.',
    price: 35.00, stock: 300,
    image: 'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=400&fit=crop'
  },

  // ── PAPER & NOTEBOOKS ─────────────────────────────────────────
  {
    _id: 'local-006', name: 'Composition Notebook (Wide Ruled)', category: 'Paper & Notebooks',
    description: '200-page wide-ruled composition notebook with a durable hard cover. Great for all subjects.',
    price: 65.00, stock: 250,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&fit=crop'
  },
  {
    _id: 'local-007', name: 'Spiral Notebook 5-Subject', category: 'Paper & Notebooks',
    description: 'Five-subject spiral notebook with tabbed dividers and pocket folders. 200 college-ruled pages.',
    price: 120.00, stock: 130,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&fit=crop'
  },
  {
    _id: 'local-008', name: 'Intermediate Pad (Yellow, 50 sheets)', category: 'Paper & Notebooks',
    description: 'Standard intermediate paper pad, 50 sheets per pack. Smooth surface for clean writing.',
    price: 28.00, stock: 500,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9501?w=400&fit=crop'
  },
  {
    _id: 'local-009', name: 'Graphing Paper Pad', category: 'Paper & Notebooks',
    description: '1/4-inch grid graphing paper pad, 50 sheets. Essential for math, science, and engineering.',
    price: 45.00, stock: 100,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&fit=crop'
  },
  {
    _id: 'local-010', name: 'Sticky Notes Assorted (4 pads)', category: 'Paper & Notebooks',
    description: 'Pack of 4 sticky note pads in pastel colors, 75 sheets each. Strong adhesive backing.',
    price: 55.00, stock: 220,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&fit=crop'
  },

  // ── ORGANIZATION & BINDERS ────────────────────────────────────
  {
    _id: 'local-011', name: '3-Ring Binder 1-inch', category: 'Organization & Binders',
    description: 'Durable 1-inch 3-ring binder with inside pockets and a clear view cover sleeve.',
    price: 95.00, stock: 160,
    image: 'https://images.unsplash.com/photo-1614632537190-23e4e3c2d341?w=400&fit=crop'
  },
  {
    _id: 'local-012', name: 'Expanding File Folder (13 pockets)', category: 'Organization & Binders',
    description: 'Accordion-style file folder with 13 labeled pockets. Snap button closure keeps documents secure.',
    price: 135.00, stock: 90,
    image: 'https://images.unsplash.com/photo-1568057373503-c56e89cd8f8a?w=400&fit=crop'
  },
  {
    _id: 'local-013', name: 'Clear Book / Document Holder (20 pockets)', category: 'Organization & Binders',
    description: 'Soft-cover clear book with 20 sheet protector pockets. Keeps reports and handouts organized.',
    price: 75.00, stock: 140,
    image: 'https://images.unsplash.com/photo-1600783245777-080fd7ff9253?w=400&fit=crop'
  },
  {
    _id: 'local-014', name: 'Index Dividers (A-Z, 26 tabs)', category: 'Organization & Binders',
    description: 'Alphabetical index dividers with reinforced mylar tabs. Fits standard 3-ring binders.',
    price: 49.00, stock: 200,
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&fit=crop'
  },

  // ── CUTTING & MEASURING TOOLS ─────────────────────────────────
  {
    _id: 'local-015', name: 'Safety Scissors (Stainless Steel)', category: 'Cutting & Measuring Tools',
    description: 'Stainless steel blades with rounded safety tips and ergonomic soft-grip handles.',
    price: 42.00, stock: 175,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&fit=crop'
  },
  {
    _id: 'local-016', name: 'Transparent Ruler 30cm', category: 'Cutting & Measuring Tools',
    description: 'Clear plastic ruler with metric and imperial markings. Break-resistant and easy to read.',
    price: 25.00, stock: 300,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop'
  },
  {
    _id: 'local-017', name: 'Geometry Set (8pcs)', category: 'Cutting & Measuring Tools',
    description: 'Complete geometry set: compass, protractor, set squares, and rulers in a zipper case.',
    price: 185.00, stock: 85,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&fit=crop'
  },
];

const ACCESSORIES = [
  {
    _id: 'capy-a01', name: 'Capy Hair Clip Set', category: 'Accessories',
    description: 'Set of 3 capybara-shaped hair clips, perfect for school!',
    price: 89, stock: 30,
    image: 'https://i.pinimg.com/736x/5b/fd/e8/5bfde8550b6b47a85a94da1911c666dd.jpg'
  },
  {
    _id: 'capy-a02', name: 'Capy Pencil Topper (3pcs)', category: 'Accessories',
    description: 'Adorable capybara heads that sit on top of your pencils. Makes studying more fun!',
    price: 55, stock: 80,
    image: 'https://down-my.img.susercontent.com/file/sg-11134201-7rdwa-lzppt87x8gc702'
  },
  {
    _id: 'capy-a03', name: 'Capy Zipper Pouch', category: 'Accessories',
    description: 'Canvas pencil pouch with an embroidered capybara face. Roomy and durable.',
    price: 149, stock: 45,
    image: 'https://counter-couture.com/cdn/shop/files/CapybaraSmallPouch.jpg?v=1701535475'
  },
  {
    _id: 'capy-a04', name: 'Capy Sticky Note Set', category: 'Accessories',
    description: '4-pad sticky notes with capybara doodles on each sheet. Pastel colors.',
    price: 75, stock: 120,
    image: 'https://kawaiipenshop.com/cdn/shop/files/Capybara-Sticky-Notes-Capybara-Stationery-Japan-Stationery-High-Quality-Notepad-Memo-Pad-Japan-Items-Asian-Items-Small-Sticky-Notes-9_1024x1024.png?v=1764613856'
  },
  {
    _id: 'capy-a05', name: 'Capy Keychain', category: 'Accessories',
    description: 'Soft rubber capybara keychain to hang on your bag or pencil case.',
    price: 49, stock: 200,
    image: 'https://tse2.mm.bing.net/th/id/OIP.FaObdZKglyXlOei8MoDu7QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a06', name: 'Capy Washi Tape (3 rolls)', category: 'Accessories',
    description: 'Decorative washi tape with a repeating capybara pattern. Great for journaling.',
    price: 95, stock: 90,
    image: 'https://i.etsystatic.com/23851763/r/il/ad6cfc/5842266591/il_1080xN.5842266591_t4r5.jpg'
  },
  {
    _id: 'capy-a07', name: 'Capy Stapler', category: 'Accessories',
    description: 'Capybara-shaped desktop stapler. Handles up to 20 sheets. Includes staples.',
    price: 145, stock: 70,
    image: 'https://th.bing.com/th/id/OIP.F1QNv8wwwqAScwLT-DZTdQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a08', name: 'Capy Scissors', category: 'Accessories',
    description: 'Stainless steel scissors with capybara-shaped soft-grip handles. Safety rounded tips.',
    price: 42, stock: 175,
    image: 'https://img.drz.lazcdn.com/g/kf/Sf1836529ad764600a586ad731394331ax.jpg_720x720q80.jpg'
  },
  {
    _id: 'capy-a09', name: 'Capy Tape Dispenser', category: 'Accessories',
    description: 'Clear adhesive tape on a capybara-shaped dispenser. Refillable and adorable.',
    price: 65, stock: 160,
    image: ''
  },
  {
    _id: 'capy-a10', name: 'Capy Eraser Set (4pcs)', category: 'Accessories',
    description: 'Set of 4 capybara-shaped erasers in fun pastel colors. Erases cleanly.',
    price: 32, stock: 280,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Eraser+Set'
  },
  {
    _id: 'capy-a11', name: 'Capy Pencil Case (Large)', category: 'Accessories',
    description: 'Spacious canvas pencil case with capybara print, main zip and two mesh pockets.',
    price: 110, stock: 120,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Pencil+Case'
  },
  {
    _id: 'capy-a12', name: 'Capy Pencil Sharpener', category: 'Accessories',
    description: 'Dual-hole capybara-shaped pencil sharpener with a built-in shavings container.',
    price: 28, stock: 230,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Sharpener'
  },
  {
    _id: 'capy-a13', name: 'Capy Calculator', category: 'Accessories',
    description: '240-function scientific calculator with capybara design. Solar + battery powered.',
    price: 349, stock: 60,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Calculator'
  },
  {
    _id: 'capy-a14', name: 'Capy Whiteboard Markers (4 colors)', category: 'Accessories',
    description: 'Low-odor dry-erase markers with capybara cap design. Black, blue, red, and green.',
    price: 95, stock: 110,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Markers'
  },
  {
    _id: 'capy-a15', name: 'Capy Backpack', category: 'Accessories',
    description: 'Water-resistant backpack with capybara embroidery, padded laptop sleeve and 3 compartments.',
    price: 899, stock: 45,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Backpack'
  },
  {
    _id: 'capy-a16', name: 'Capy Paper Clips (100pcs)', category: 'Accessories',
    description: 'Standard steel paper clips packaged in a capybara-printed tin box. 100 per box.',
    price: 18, stock: 400,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Paper+Clips'
  },
  {
    _id: 'capy-a17', name: 'Capy Binder Clips (30pcs)', category: 'Accessories',
    description: 'Assorted size binder clips in capybara-themed colors. Strong spring tension.',
    price: 35, stock: 350,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Binder+Clips'
  },
  {
    _id: 'capy-a18', name: 'Capy Glue Stick (3pcs)', category: 'Accessories',
    description: 'Washable acid-free glue sticks with capybara label. Perfect for school projects.',
    price: 48, stock: 200,
    image: 'https://placehold.co/400x300/C8975A/ffffff?text=Capy+Glue+Stick'
  },
];

const ALL_LOCAL_PRODUCTS = [...SCHOOL_SUPPLIES, ...ACCESSORIES];

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

  categories = computed(() => {
    const products = this.productService.productList();
    return ['All', ...new Set(products.map(p => p.category))];
  });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const products = this.productService.productList();
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  });

  ngOnInit() {
    this.productService.fetchProducts();

    setTimeout(() => {
      const currentProducts = this.productService.productList();
      const hasLocalProducts = currentProducts.some(p =>
        p._id?.toString().startsWith('local-') ||
        p._id?.toString().startsWith('capy-')
      );

      if (!hasLocalProducts) {
        this.productService.productList.update(list => [...list, ...ALL_LOCAL_PRODUCTS]);
      }
    }, 2000);
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