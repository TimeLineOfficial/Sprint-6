// Everyday Consumer Product & Service Data Generator (5,000 Products)
// Simple, clear, easy-to-understand names for everyday buyers

const CATEGORIES = [
  { id: 'electronics', name: 'Smartphones & Mobiles', icon: 'Smartphone' },
  { id: 'computing', name: 'Laptops & Computers', icon: 'Laptop' },
  { id: 'appliances', name: 'Home Appliances & TVs', icon: 'Tv' },
  { id: 'fashion', name: 'Fashion & Smartwatches', icon: 'Shirt' },
  { id: 'audio', name: 'Headphones & Speakers', icon: 'Headphones' },
  { id: 'sports', name: 'Sports & Gym Fitness', icon: 'Activity' }
];

const CATEGORY_ITEMS = {
  electronics: [
    "Galaxy 5G Smartphone",
    "iPhone Pro Max 256GB",
    "Android 5G Phone",
    "Ultra Slim Smartphone",
    "Dual SIM 5G Mobile"
  ],
  computing: [
    "Gaming Laptop Intel i7",
    "Slim Aluminium Laptop 16GB RAM",
    "MacBook Air 512GB SSD",
    "Office Workstation Laptop",
    "Touchscreen Convertible Laptop"
  ],
  appliances: [
    "55 Inch 4K Smart LED TV",
    "Double Door Refrigerator 350L",
    "Split Air Conditioner 1.5 Ton",
    "Digital Air Fryer 5L",
    "Fully Automatic Washing Machine"
  ],
  fashion: [
    "Fitness Smartwatch with Heart Rate Monitor",
    "Men Running Sports Sneakers",
    "Waterproof Sports Smartwatch",
    "Cotton Casual T-Shirt & Shorts Set",
    "Leather Travel Jacket & Backpack"
  ],
  audio: [
    "Noise Cancelling Over-Ear Headphones",
    "Wireless Bluetooth Earbuds with Mic",
    "Portable Bass Soundbar Speaker",
    "Studio Monitor Headphones",
    "Waterproof Wireless Earphones"
  ],
  sports: [
    "Adjustable Gym Dumbbells Set 20kg",
    "Folding Motorized Home Treadmill",
    "Yoga Fitness Mat with Strap",
    "Waterproof Fitness Band",
    "Indoor Exercise Cycle Bike"
  ]
};

const CATEGORY_IMAGES = {
  electronics: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80"
  ],
  computing: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80"
  ],
  appliances: [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
  ],
  fashion: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  ],
  audio: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
  ],
  sports: [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80"
  ]
};

const BRANDS = ["Samsung", "Apple", "Sony", "Dell", "LG", "HP", "Lenovo", "Bose", "Nike", "Adidas", "Panasonic", "Xiaomi", "Philips"];
const BADGES = ["Bestseller", "Top Choice", "Super Deal", "25% OFF", "Limited Offer", null, null];

let cachedProducts = null;

export const generateProducts = (count = 5000) => {
  if (cachedProducts && cachedProducts.length === count) {
    return cachedProducts;
  }

  const products = [];

  for (let i = 1; i <= count; i++) {
    const categoryObj = CATEGORIES[(i - 1) % CATEGORIES.length];
    const catId = categoryObj.id;
    const brand = BRANDS[(i * 7) % BRANDS.length];
    const itemNames = CATEGORY_ITEMS[catId];
    const simpleName = itemNames[i % itemNames.length];
    const fullName = `${brand} ${simpleName} (Model #${i})`;

    const price = Math.round(((i * 19.3) % 1450 + 29) * 100) / 100;
    const discountPct = Math.floor((i % 4) * 10 + 15);
    const originalPrice = Math.round((price * (1 + discountPct / 100)) * 100) / 100;
    const rating = Math.round(((i * 3.7) % 0.8 + 4.1) * 10) / 10;
    const reviewCount = (i * 37) % 3400 + 45;

    const images = CATEGORY_IMAGES[catId];
    const image = images[i % images.length];
    const badge = BADGES[i % BADGES.length];
    const inStock = i % 19 !== 0;
    const stockQuantity = inStock ? (i % 90) + 10 : 0;
    const isFeatured = i <= 24 || i % 80 === 0;

    products.push({
      id: `PROD-${i.toString().padStart(4, '0')}`,
      numId: i,
      name: fullName,
      brand: brand,
      category: categoryObj.name,
      categoryId: catId,
      price: price,
      originalPrice: originalPrice,
      discountPct: discountPct,
      rating: rating,
      reviewCount: reviewCount,
      image: image,
      inStock: inStock,
      stockQuantity: stockQuantity,
      badge: badge,
      isFeatured: isFeatured,
      isAssured: i % 3 === 0,
      freeDelivery: i % 2 === 0,
      description: `Official brand product from ${brand}. Genuine quality product with 1-Year Manufacturer Warranty, 7-Day Easy Returns, and Free Doorstep Express Delivery.`,
      specs: {
        brand: brand,
        model: `Model-${i}`,
        warranty: `1 Year Official ${brand} Brand Warranty`,
        delivery: i % 2 === 0 ? "Free Express Doorstep Delivery (24 Hours)" : "Standard Delivery (2-3 Days)",
        returns: "7 Days Easy Replacement & Refund",
        payment: "Cash on Delivery (COD), UPI, Cards & PayPal Accepted"
      },
      tags: [categoryObj.name, brand, "Consumer Goods"]
    });
  }

  cachedProducts = products;
  return products;
};

export { CATEGORIES };
