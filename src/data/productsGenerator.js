// Product Data Generator for 5,000 Cybernetic & Quantum Products
// Designed for Phase 3 DOM Virtualization

const CATEGORIES = [
  { id: 'neural', name: 'Neural Implants', icon: 'BrainCircuit' },
  { id: 'quantum', name: 'Quantum Wearables', icon: 'Atom' },
  { id: 'bionics', name: 'Cyber Bionics', icon: 'Zap' },
  { id: 'holo', name: 'Holographic Displays', icon: 'Eye' },
  { id: 'drones', name: 'Autonomous Drones', icon: 'Bot' },
  { id: 'haptics', name: 'Haptic Suits', icon: 'ShieldAlert' }
];

const CATEGORY_IMAGES = {
  neural: [
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80"
  ],
  quantum: [
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
  ],
  bionics: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
  ],
  holo: [
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
  ],
  drones: [
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=600&q=80"
  ],
  haptics: [
    "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=80"
  ]
};

const PREFIXES = ["Aether", "Chronos", "Hyperion", "Nexus", "VORTEX", "Synapse", "Quantum", "Cyber", "Titan", "Spectra", "Omega", "Neural", "Apex", "Zero-G", "Helix"];
const NAMES = ["Link Core", "Processor", "Visual Visor", "Reflex Matrix", "Exo-Spine", "Orb Sentinel", "Feedback Suit", "Pulse Vector", "Lattice Deck", "Chrono Band", "Aura Armor", "Optic Array"];
const SUFFIXES = ["X-1", "Pro Max", "Ultra Quantum", "MK-VII", "Overclock", "Genesis", "Infinity", "V2.0", "Prime Edition", "Cyber-Spec"];

const BADGES = ["NEW", "BESTSELLER", "QUANTUM TIER", "LIMITED EDITION", "PRO TIER", null, null, null];

// Generate deterministic 5,000 items cached in memory
let cachedProducts = null;

export const generateProducts = (count = 5000) => {
  if (cachedProducts && cachedProducts.length === count) {
    return cachedProducts;
  }

  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const categoryObj = CATEGORIES[(i - 1) % CATEGORIES.length];
    const catId = categoryObj.id;
    const catName = categoryObj.name;

    const prefix = PREFIXES[(i * 7) % PREFIXES.length];
    const nameCore = NAMES[(i * 13) % NAMES.length];
    const suffix = SUFFIXES[(i * 19) % SUFFIXES.length];
    const fullName = `${prefix} ${nameCore} ${suffix} #${i.toString().padStart(4, '0')}`;

    const price = Math.round(((i * 17.53) % 4950 + 49) * 100) / 100;
    const rating = Math.round(((i * 3.7) % 1.0 + 4.0) * 10) / 10;
    const reviewCount = (i * 29) % 1450 + 12;

    const images = CATEGORY_IMAGES[catId];
    const image = images[i % images.length];

    const badge = BADGES[i % BADGES.length];
    const inStock = i % 17 !== 0;
    const stockQuantity = inStock ? (i % 85) + 5 : 0;
    const isFeatured = i <= 24 || i % 100 === 0;

    products.push({
      id: `PROD-${i.toString().padStart(4, '0')}`,
      numId: i,
      name: fullName,
      category: catName,
      categoryId: catId,
      price: price,
      originalPrice: Math.round(price * 1.25 * 100) / 100,
      rating: rating,
      reviewCount: reviewCount,
      image: image,
      inStock: inStock,
      stockQuantity: stockQuantity,
      badge: badge,
      isFeatured: isFeatured,
      description: `Engineered for next-generation cybernetic augmentation. The ${fullName} integrates real-time sub-atomic processing, zero-latency neural bridging, and military-grade encryption.`,
      specs: {
        architecture: `${prefix}-Quantum v${(i % 5) + 1}.0`,
        frequency: `${((i % 8) + 1) * 2.4} GHz`,
        latency: `< ${(i % 3) + 0.2} ms`,
        powerCell: `${(i % 12) + 12}h Solid-State Battery`,
        chassis: i % 2 === 0 ? "Carbon-Nanotube Weave" : "Aerospace Titanium Alloy",
        warranty: `${(i % 3) + 1} Years Global CyberCare`
      },
      tags: [catName, prefix, "Cyberpunk", "Quantum-Tech"]
    });
  }

  cachedProducts = products;
  return products;
};

export { CATEGORIES };
