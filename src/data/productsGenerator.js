// Everyday Consumer Products & Urban Company On-Demand Services Data Generator (5,000 Items)

const CATEGORIES = [
  // Products
  { id: 'electronics', name: 'Smartphones & Mobiles', icon: 'Smartphone', type: 'product' },
  { id: 'computing', name: 'Laptops & Computers', icon: 'Laptop', type: 'product' },
  { id: 'appliances', name: 'Home Appliances & TVs', icon: 'Tv', type: 'product' },
  { id: 'fashion', name: 'Fashion & Smartwatches', icon: 'Shirt', type: 'product' },
  { id: 'audio', name: 'Headphones & Speakers', icon: 'Headphones', type: 'product' },
  { id: 'sports', name: 'Sports & Gym Fitness', icon: 'Activity', type: 'product' },

  // Urban Company On-Demand Services
  { id: 'services-ac', name: 'AC Service & Repair', icon: 'Wind', type: 'service' },
  { id: 'services-cleaning', name: 'Home & Car Cleaning', icon: 'Sparkles', type: 'service' },
  { id: 'services-plumbing-electric', name: 'Plumbing & Electrician', icon: 'Zap', type: 'service' },
  { id: 'services-salon', name: 'Salon & Spa at Home', icon: 'Scissors', type: 'service' },
  { id: 'services-appliances', name: 'Appliance Repair Services', icon: 'Wrench', type: 'service' }
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
  ],

  // Services
  'services-ac': [
    "AC Foam Jet Deep Servicing",
    "Split / Window AC Gas Refill & Leak Fix",
    "Anti-Rust Coating & Deep Chemical Clean",
    "AC Uninstallation & Installation Pack",
    "Complete AC Diagnostic & Inspection"
  ],
  'services-cleaning': [
    "Full Home Deep Cleaning (Furnished)",
    "Bathroom & Tile Sanitization Clean",
    "Sofa & Carpet Foam Shampooing",
    "Kitchen Deep Degreasing & Stain Removal",
    "Full Car Exterior Wash & Interior Detail"
  ],
  'services-plumbing-electric': [
    "Switchboard & Heavy Wiring Repair",
    "Ceiling Fan & Chandelier Installation",
    "Tap, Flush & Pipe Leakage Repair",
    "Bathroom Fitting & Shower Assembly",
    "Complete Home Electrical Inspection"
  ],
  'services-salon': [
    "Men Haircut & Royal Beard Styling",
    "Organic Hair Spa & Scalp Therapy",
    "Women Radiant Facial & Cleanup",
    "Full Body Aromatherapy Massage (Spa)",
    "Pedicure & Manicure Deluxe Care"
  ],
  'services-appliances': [
    "Front/Top Load Washing Machine Servicing",
    "Double Door Refrigerator Gas & Cooling Repair",
    "RO Water Purifier Filter Replacement",
    "Microwave Oven Heating Repair",
    "Geyser Heating Element Replacement"
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
  ],

  // Services Images
  'services-ac': [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80"
  ],
  'services-cleaning': [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  ],
  'services-plumbing-electric': [
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80"
  ],
  'services-salon': [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  ],
  'services-appliances': [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
  ]
};

const BRANDS = ["Samsung", "Apple", "Sony", "Dell", "LG", "HP", "Lenovo", "Bose", "Nike", "Adidas", "Panasonic", "Xiaomi", "Philips"];
const SERVICE_PROVIDERS = ["UrbanCare Experts", "Prodesk Home Services", "Himesh Certified Techs", "MasterClean Pro", "UrbanSalon Specialists"];
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
    const isService = categoryObj.type === 'service';
    
    const brand = isService 
      ? SERVICE_PROVIDERS[i % SERVICE_PROVIDERS.length] 
      : BRANDS[(i * 7) % BRANDS.length];
      
    const itemNames = CATEGORY_ITEMS[catId];
    const simpleName = itemNames[i % itemNames.length];
    const fullName = isService ? `[Service] ${simpleName}` : `${brand} ${simpleName} (Model #${i})`;

    const price = isService 
      ? Math.round(((i * 12.5) % 180 + 29) * 10) / 10 
      : Math.round(((i * 19.3) % 1450 + 29) * 100) / 100;
      
    const discountPct = Math.floor((i % 4) * 10 + 15);
    const originalPrice = Math.round((price * (1 + discountPct / 100)) * 100) / 100;
    const rating = Math.round(((i * 3.7) % 0.8 + 4.1) * 10) / 10;
    const reviewCount = (i * 37) % 3400 + 45;

    const images = CATEGORY_IMAGES[catId];
    const image = images[i % images.length];
    const badge = isService ? "Urban Guaranteed" : BADGES[i % BADGES.length];
    const inStock = true;
    const stockQuantity = isService ? 999 : (i % 90) + 10;
    const isFeatured = i <= 24 || i % 80 === 0;

    products.push({
      id: isService ? `SERV-${i.toString().padStart(4, '0')}` : `PROD-${i.toString().padStart(4, '0')}`,
      numId: i,
      name: fullName,
      brand: brand,
      category: categoryObj.name,
      categoryId: catId,
      isService: isService,
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
      freeDelivery: isService ? false : i % 2 === 0,
      duration: isService ? "45 - 60 Mins" : null,
      serviceWarranty: isService ? "30 Days Service Guarantee" : null,
      availableSlots: isService ? ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"] : [],
      description: isService 
        ? `Professional doorstep service delivered by background-verified experts. Includes genuine spare parts, post-service cleanup, and 30 days hassle-free warranty.` 
        : `Official brand product from ${brand}. Genuine quality product with 1-Year Manufacturer Warranty, 7-Day Easy Returns, and Free Doorstep Express Delivery.`,
      specs: isService ? {
        provider: brand,
        duration: "45-60 Minutes",
        warranty: "30 Days Urban Protection Guarantee",
        cancellation: "Free Cancellation up to 2 hours before slot",
        technician: "Background Verified & Masked Professional"
      } : {
        brand: brand,
        model: `Model-${i}`,
        warranty: `1 Year Official ${brand} Brand Warranty`,
        delivery: i % 2 === 0 ? "Free Express Doorstep Delivery (24 Hours)" : "Standard Delivery (2-3 Days)",
        returns: "7 Days Easy Replacement & Refund",
        payment: "Cash on Delivery (COD), UPI, Cards & PayPal Accepted"
      },
      tags: [categoryObj.name, brand, isService ? "On-Demand Service" : "Consumer Goods"]
    });
  }

  cachedProducts = products;
  return products;
};

export { CATEGORIES };
