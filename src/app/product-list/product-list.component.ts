import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

const SCHOOL_SUPPLIES = [
  {
    _id: 'local-001', name: 'Capy Ballpoint Pen Set (12pcs)', category: 'School Supplies',
    description: 'Smooth-writing ballpoint pens in assorted colors. Ideal for everyday note-taking and schoolwork.',
    price: 89.00, stock: 200,
    image: 'https://m.media-amazon.com/images/I/71WLGJ6iWZL._AC_SL1500_.jpg'
  },
  {
    _id: 'local-002', name: 'Capy Mechanical Pencil 0.5mm', category: 'School Supplies',
    description: 'Ergonomic mechanical pencil with a non-slip grip. Includes 3 refill lead tubes.',
    price: 55.00, stock: 150,
    image: 'https://down-ph.img.susercontent.com/file/sg-11134201-7rdvn-m07460nny5dm3f'
  },
  {
    _id: 'local-004', name: 'Capy Highlighter Set (6 colors)', category: 'School Supplies',
    description: 'Chisel-tip fluorescent highlighters for color-coded studying. Fade-resistant and quick-drying.',
    price: 79.00, stock: 180,
    image: 'https://tse4.mm.bing.net/th/id/OIP.2nXkKAEJ5axgChB3TQQgdAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'local-005', name: 'Capy Correction Tape', category: 'School Supplies',
    description: 'Compact correction tape roller with clean, dry coverage. No smearing, no drying time needed.',
    price: 35.00, stock: 300,
    image: 'https://laz-img-sg.alicdn.com/p/65d933592b5086ed1e927841109111cb.jpg'
  },
  {
    _id: 'local-007', name: 'Capy Spiral Notebook 5-Subject', category: 'School Supplies',
    description: 'Five-subject spiral notebook with tabbed dividers and pocket folders. 200 college-ruled pages.',
    price: 120.00, stock: 130,
    image: 'https://d2kjw6oms2k17m.cloudfront.net/sites/files/chasingunicorns/images/products/202410/o1cn01bavbaj1na2hkbfr5w_3854355048-0-cib.jpg'
  },
  {
    _id: 'local-008', name: 'Capy Intermediate Pad (Yellow, 50 sheets)', category: 'School Supplies',
    description: 'Standard intermediate paper pad, 50 sheets per pack. Smooth surface for clean writing.',
    price: 28.00, stock: 500,
    image: 'https://i.pinimg.com/736x/39/59/18/3959189c26c0779b20c8735ce8a9fea3.jpg'
  },
  {
    _id: 'local-010', name: 'Capy Sticky Notes Assorted (4 pads)', category: 'School Supplies',
    description: 'Pack of 4 sticky note pads in pastel colors, 75 sheets each. Strong adhesive backing.',
    price: 55.00, stock: 220,
    image: 'https://kawaiipenshop.com/cdn/shop/files/Capybara-Sticky-Notes-Capybara-Stationery-Japan-Stationery-High-Quality-Notepad-Memo-Pad-Japan-Items-Asian-Items-Small-Sticky-Notes-9_1024x1024.png?v=1764613856'
  },
  {
    _id: 'local-011', name: 'Capy 3-Ring Binder 1-inch', category: 'School Supplies',
    description: 'Durable 1-inch 3-ring binder with inside pockets and a clear view cover sleeve.',
    price: 95.00, stock: 160,
    image: 'https://i5.walmartimages.com/seo/3-Ring-Binder-1-5-inch-Round-Rings-with-Interior-Pockets-Binders-Organizer-Office-School-1Pack-Cute-Brown-Capybara-Pattern_10f73929-19ce-4850-8a74-fac26cc29c44.714c5b0ab581113c40a2e17566ef6829.jpeg'
  },
  {
    _id: 'local-012', name: 'Capy Expanding File Folder (13 pockets)', category: 'School Supplies',
    description: 'Accordion-style file folder with 13 labeled pockets. Snap button closure keeps documents secure.',
    price: 135.00, stock: 90,
    image: 'https://down-my.img.susercontent.com/file/cn-11134207-7r98o-ls6gh835jxst18'
  },
  {
    _id: 'local-014', name: 'Capy Index Dividers (A-Z, 26 tabs)', category: 'School Supplies',
    description: 'Alphabetical index dividers with reinforced mylar tabs. Fits standard 3-ring binders.',
    price: 49.00, stock: 200,
    image: 'https://cbu01.alicdn.com/img/ibank/O1CN01rhp5bf1dfxidbDwrp_!!2217483313764-0-cib.310x310.jpg'
  },
  {
    _id: 'local-015', name: 'Capy Safety Scissors (Stainless Steel)', category: 'School Supplies',
    description: 'Stainless steel blades with rounded safety tips and ergonomic soft-grip handles.',
    price: 42.00, stock: 175,
    image: 'https://www.picclickimg.com/GJUAAeSwxeVoo1s-/2Pcs-Cartoon-Capybara-Children-Safe-Scissors-Handmade-Paper.webp'
  },
  {
    _id: 'local-016', name: 'Capy Transparent Ruler 30cm', category: 'School Supplies',
    description: 'Clear plastic ruler with metric and imperial markings. Break-resistant and easy to read.',
    price: 25.00, stock: 300,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7ras8-m2m4kpd46gut74'
  },
  {
    _id: 'local-017', name: 'Capy Geometry Set (8pcs)', category: 'School Supplies',
    description: 'Complete geometry set: compass, protractor, set squares, and rulers in a zipper case.',
    price: 185.00, stock: 85,
    image: 'https://down-ph.img.susercontent.com/file/sg-11134201-7rff1-m3r7k5wn83m6e2'
  },
  // Moving relevant accessories to School Supplies
  {
    _id: 'local-018', name: 'Capy Pencil Topper (3pcs)', category: 'School Supplies',
    description: 'Adorable capybara heads that sit on top of your pencils. Makes studying more fun!',
    price: 55, stock: 80,
    image: 'https://down-my.img.susercontent.com/file/sg-11134201-7rdwa-lzppt87x8gc702'
  },
  {
    _id: 'local-019', name: 'Capy Zipper Pouch', category: 'School Supplies',
    description: 'Canvas pencil pouch with an embroidered capybara face. Roomy and durable.',
    price: 149, stock: 45,
    image: 'https://counter-couture.com/cdn/shop/files/CapybaraSmallPouch.jpg?v=1701535475'
  },
  {
    _id: 'local-020', name: 'Capy Sticky Note Set', category: 'School Supplies',
    description: '4-pad sticky notes with capybara doodles on each sheet. Pastel colors.',
    price: 75, stock: 120,
    image: 'https://kawaiipenshop.com/cdn/shop/files/Capybara-Sticky-Notes-Capybara-Stationery-Japan-Stationery-High-Quality-Notepad-Memo-Pad-Japan-Items-Asian-Items-Small-Sticky-Notes-9_1024x1024.png?v=1764613856'
  },
  {
    _id: 'local-021', name: 'Capy Washi Tape (3 rolls)', category: 'School Supplies',
    description: 'Decorative washi tape with a repeating capybara pattern. Great for journaling.',
    price: 95, stock: 90,
    image: 'https://i.etsystatic.com/23851763/r/il/ad6cfc/5842266591/il_1080xN.5842266591_t4r5.jpg'
  },
  {
    _id: 'local-022', name: 'Capy Stapler', category: 'School Supplies',
    description: 'Capybara-shaped desktop stapler. Handles up to 20 sheets. Includes staples.',
    price: 145, stock: 70,
    image: 'https://th.bing.com/th/id/OIP.F1QNv8wwwqAScwLT-DZTdQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'local-023', name: 'Capy Scissors', category: 'School Supplies',
    description: 'Stainless steel scissors with capybara-shaped soft-grip handles. Safety rounded tips.',
    price: 42, stock: 175,
    image: 'https://img.drz.lazcdn.com/g/kf/Sf1836529ad764600a586ad731394331ax.jpg_720x720q80.jpg'
  },
  {
    _id: 'local-024', name: 'Capy Tape Dispenser', category: 'School Supplies',
    description: 'Clear adhesive tape on a capybara-shaped dispenser. Refillable and adorable.',
    price: 65, stock: 160,
    image: 'https://i5.walmartimages.com/seo/Lovely-Capybaras-Shape-Tissue-Dispenser-Elegant-Capybaras-Tissue-Container-Paper-Stand-Rack-Great-For-Modern-Interiors_ac159a26-20fc-4bfb-95d2-9b514107a6d7.0ad47b461576dfdfb2bde711df764abf.jpeg'
  },
  {
    _id: 'local-025', name: 'Capy Eraser Set (4pcs)', category: 'School Supplies',
    description: 'Set of 4 capybara-shaped erasers in fun pastel colors. Erases cleanly.',
    price: 32, stock: 280,
    image: 'https://tse2.mm.bing.net/th/id/OIP.MCqCVmNbokkkpPamyLS3RwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'local-026', name: 'Capy Pencil Case (Large)', category: 'School Supplies',
    description: 'Spacious canvas pencil case with capybara print, main zip and two mesh pockets.',
    price: 110, stock: 120,
    image: 'https://tse2.mm.bing.net/th/id/OIP.ejgSdMx-0CFkm19rJ9Kv7gHaHN?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'local-027', name: 'Capy Pencil Sharpener', category: 'School Supplies',
    description: 'Dual-hole capybara-shaped pencil sharpener with a built-in shavings container.',
    price: 28, stock: 230,
    image: 'https://down-my.img.susercontent.com/file/id-11134207-7ra0i-mbhuy1igw3o392'
  },
  {
    _id: 'local-028', name: 'Capy Glue Stick (3pcs)', category: 'School Supplies',
    description: 'Washable acid-free glue sticks with capybara label. Perfect for school projects.',
    price: 48, stock: 200,
    image: 'https://down-my.img.susercontent.com/file/sg-11134201-7rd40-m7t615sjg9ql9d'
  }
];

const ACCESSORIES = [
  {
    _id: 'capy-a01', name: 'Capy Hair Clip Set', category: 'Accessories',
    description: 'Set of 3 capybara-shaped hair clips, perfect for adding cuteness to any outfit!',
    price: 89, stock: 30,
    image: 'https://i.pinimg.com/736x/5b/fd/e8/5bfde8550b6b47a85a94da1911c666dd.jpg'
  },
  {
    _id: 'capy-a02', name: 'Capy Keychain', category: 'Accessories',
    description: 'Soft rubber capybara keychain to hang on your bag or keys.',
    price: 49, stock: 200,
    image: 'https://tse2.mm.bing.net/th/id/OIP.FaObdZKglyXlOei8MoDu7QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a03', name: 'Capy Backpack', category: 'Accessories',
    description: 'Water-resistant backpack with capybara embroidery, padded laptop sleeve and 3 compartments.',
    price: 899, stock: 45,
    image: 'https://m.media-amazon.com/images/I/71CBYimyAiL._AC_SL1500_.jpg'
  },
  {
    _id: 'capy-a04', name: 'Capy Phone Case', category: 'Accessories',
    description: 'Shockproof phone case with cute capybara design. Compatible with most smartphone models.',
    price: 199, stock: 100,
    image: 'https://tse1.explicit.bing.net/th/id/OIP.o8pZnOwpABS47ck3p3Wf9AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a05', name: 'Capy Socks (3 pairs)', category: 'Accessories',
    description: 'Comfortable cotton socks with capybara patterns. Available in various colors.',
    price: 159, stock: 150,
    image: 'https://th.bing.com/th/id/OIP.bLs4gixO05w22L1pC5ceowHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a06', name: 'Capy Beanie Hat', category: 'Accessories',
    description: 'Warm knit beanie with embroidered capybara face. Perfect for cold weather.',
    price: 249, stock: 80,
    image: 'https://tse1.mm.bing.net/th/id/OIP.xpDCZ16tHPyzgH5Z8_DASgHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a07', name: 'Capy Tote Bag', category: 'Accessories',
    description: 'Reusable canvas tote bag with cute capybara print. Perfect for shopping or daily use.',
    price: 299, stock: 120,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98o-lviqi6o14e5bae'
  },
  {
    _id: 'capy-a10', name: 'Capy Lanyard', category: 'Accessories',
    description: 'Durable lanyard with capybara print and metal clip. Perfect for ID cards or keys.',
    price: 69, stock: 180,
    image: 'https://tse4.mm.bing.net/th/id/OIP.wPZdIVK3CrIJ8LqLCMzRlwHaM3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a11', name: 'Capy Water Bottle', category: 'Accessories',
    description: 'Stainless steel water bottle with capybara design. Insulated and BPA-free.',
    price: 399, stock: 75,
    image: 'https://m.media-amazon.com/images/I/61804z8CVWL._AC_SL1001_.jpg'
  },
  {
    _id: 'capy-a12', name: 'Capy Sticker Pack (20pcs)', category: 'Accessories',
    description: 'Assorted capybara stickers. Perfect for decorating laptops, notebooks, or water bottles.',
    price: 49, stock: 300,
    image: 'https://tse3.mm.bing.net/th/id/OIP.yIkJREWCXH445o-cgbbyMAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a13', name: 'Capy Pin Set (5pcs)', category: 'Accessories',
    description: 'Enamel pin set featuring different capybara poses. Great for bags or jackets.',
    price: 199, stock: 95,
    image: 'https://down-my.img.susercontent.com/file/sg-11134201-7rdvu-lxwdrxhfi35263'
  },
  {
    _id: 'capy-a14', name: 'Capy Plush Keychain', category: 'Accessories',
    description: 'Small plush capybara keychain. Soft and huggable mini size.',
    price: 129, stock: 150,
    image: 'https://tse1.explicit.bing.net/th/id/OIP.rcXfNm4i-3e_euwHatGvEQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a15', name: 'Capy Baseball Cap', category: 'Accessories',
    description: 'Adjustable baseball cap with embroidered capybara logo. One size fits most.',
    price: 279, stock: 110,
    image: 'https://tse2.mm.bing.net/th/id/OIP.TYR7Cr8X1e0U3omNAgKacgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a17', name: 'Capy Watch Band', category: 'Accessories',
    description: 'Compatible smartwatch band with capybara pattern. Fits most models.',
    price: 189, stock: 85,
    image: 'https://i.pinimg.com/originals/9b/89/11/9b8911bfbfaa671108c7e1f31246d5d9.jpg'
  },
  {
    _id: 'capy-a18', name: 'Capy Pajama Set', category: 'Accessories',
    description: 'Soft cotton pajama set with all-over capybara print. Available in various sizes.',
    price: 599, stock: 40,
    image: 'https://tse1.explicit.bing.net/th/id/OIP.l7XqssR9jzkH_wIJJB--QQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a19', name: 'Capy Slippers', category: 'Accessories',
    description: 'Plush capybara house slippers. Non-slip sole, available in multiple sizes.',
    price: 349, stock: 65,
    image: 'https://tse4.mm.bing.net/th/id/OIP.eN1MWiCVhQmihl919RCtGgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    _id: 'capy-a20', name: 'Capy T-Shirt', category: 'Accessories',
    description: '100% cotton t-shirt with cute capybara graphic print. Available in S, M, L, XL.',
    price: 399, stock: 120,
    image: 'https://tse1.explicit.bing.net/th/id/OIP.f4QBLuj2JvG-vWrO9bs7WwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  }
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

    // Add products immediately if no products exist
    const currentProducts = this.productService.productList();
    if (currentProducts.length === 0) {
      this.productService.productList.set(ALL_LOCAL_PRODUCTS);
    }
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