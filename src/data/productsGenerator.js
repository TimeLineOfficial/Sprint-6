// Professional E-Commerce Product Data Generator (5,000 Products)
// Designed for Flipkart / Alibaba style marketplace

const CATEGORIES = [
  { id: 'electronics', name: 'Mobiles & Electronics', icon: 'Smartphone' },
  { id: 'computing', name: 'Laptops & Computers', icon: 'Laptop' },
  { id: 'appliances', name: 'Home Appliances', icon: 'Tv' },
  { id: 'fashion', name: 'Fashion & Wearables', icon: 'Shirt' },
  { id: 'audio', name: 'Audio & Headphones', icon: 'Headphones' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Activity' }
];

const CATEGORY_IMAGES = {
  electronics: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80"
  ],
  computing: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80"
  ],
  appliances: [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80"
  ],
  fashion: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  ],
  audio: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
  ],
  sports: [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
  ]
};

const BRANDS = ["Samsung", "Sony", "Apple", "Dell", "LG", "HP", "Lenovo", "Asus", "Bose", "Nike", "Adidas", "Panasonic", "Xiaomi", "OnePlus", "Philips"];
const PRODUCT_NAMES = ["Ultra Smartphone", "Pro Gaming Laptop", "Smart LED 4K TV", "Noise Cancelling Headphones", "Fitness Smartwatch", "Wireless Earbuds", "Ultra-Slim Tablet", "Home Air Purifier", "Ergonomic Office Chair", "High-Speed Router"];

const BADGES = ["Bestseller", "Top Choice", "Super Deal", "25% OFF", "Limited Offer", null, null];

let cachedProducts = null;

export const generateProducts = (count = 5000) => {
  if (cachedProducts && cachedProducts.length === count) {
    return cachedProducts;
  }

  const products = [];

  for (let i = 1; i <= count; i++) {
    const categoryObj = CATEGORIES[(i - 1) % CATEGORIES.length];
    const brand = BRANDS[(i * 7) % BRANDS.length];
    const coreName = PRODUCT_NAMES[(i * 13) % PRODUCT_NAMES.length];
    const fullName = `${brand} ${coreName} Series-${i}`;

    const price = Math.round(((i * 19.3) % 1950 + 29) * 100) / 100;
    const discountPct = Math.floor((i % 4) * 10 + 15); // 15% to 45% discount
    const originalPrice = Math.round((price * (1 + discountPct / 100)) * 100) / 100;
    const rating = Math.round(((i * 3.7) % 0.8 + 4.1) * 10) / 10;
    const reviewCount = (i * 37) % 3400 + 45;

    const images = CATEGORY_IMAGES[categoryObj.id];
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
      categoryId: categoryObj.id,
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
      isAssured: i % 3 === 0, // Flipkart Assured style badge
      freeDelivery: i % 2 === 0,
      description: `Official ${brand} guaranteed product. Packed with high-end performance features, durable build quality, energy efficiency, and full manufacturer warranty.`,
      specs: {
        brand: brand,
        model: `MK-${i}`,
        warranty: `${(i % 3) + 1} Year Official Brand Warranty`,
        delivery: i % 2 === 0 ? "Free Express 24h Delivery" : "Standard 2-3 Days",
        seller: "Global Direct Certified Retailer",
        rating: `${rating} / 5.0 (${reviewCount} Reviews)`
      },
      tags: [categoryObj.name, brand, "Featured"]
    });
  }

  cachedProducts = products;
  return products;
};

export { CATEGORIES };
