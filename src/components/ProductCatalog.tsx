import React, { useState } from 'react';
import { Eye, Plus } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: 'spices' | 'pantry' | 'sweeteners' | 'beverages';
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeType?: 'primary' | 'accent';
  details: {
    origin: string;
    ingredients: string;
    shelfLife: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'ghee-01',
    name: 'Pure Bilona Cow Ghee',
    category: 'pantry',
    price: 650,
    description: 'Slow-cooked ghee prepared using the traditional Bilona churning method from native cow milk. Unmatched aroma and purity.',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600',
    badge: 'Best Seller',
    badgeType: 'accent',
    details: {
      origin: 'Malnad Region, Karnataka',
      ingredients: 'Clarified Butter (100% Cow Milk Lipids)',
      shelfLife: '12 Months'
    }
  },
  {
    id: 'honey-01',
    name: 'Wild Forest Honey',
    category: 'sweeteners',
    price: 420,
    description: '100% raw, unprocessed honey ethically sourced from wild hives in the dense Western Ghats forests. Retains natural pollen.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
    badge: 'Pure Organic',
    badgeType: 'primary',
    details: {
      origin: 'Western Ghats Biosphere',
      ingredients: '100% Raw Forest Honey',
      shelfLife: '24 Months (Never really expires)'
    }
  },
  {
    id: 'spice-01',
    name: 'Goudra Special Sambar Powder',
    category: 'spices',
    price: 180,
    description: 'A generations-old family recipe containing 21 spices slow-roasted to perfection. Brings the authentic taste of a traditional home.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    badge: 'Signature',
    badgeType: 'accent',
    details: {
      origin: 'Goudra Family Kitchen, Mandya',
      ingredients: 'Coriander seeds, Cumin, Black Pepper, Fenugreek, Asafoetida, Curry leaves, Native Chillies, Turmeric',
      shelfLife: '6 Months'
    }
  },
  {
    id: 'coffee-01',
    name: 'Heritage Coorg Filter Coffee',
    category: 'beverages',
    price: 290,
    description: 'An artisanal blend of 80% premium Arabica & Robusta coffee beans and 20% chicory, roasted to a medium-dark profile.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    badge: 'Fresh Ground',
    badgeType: 'primary',
    details: {
      origin: 'Coorg High-Altitude Estates',
      ingredients: '80% Roasted Coffee, 20% Chicory',
      shelfLife: '9 Months'
    }
  },
  {
    id: 'pickle-01',
    name: 'Homemade Lemon Pickle',
    category: 'spices',
    price: 150,
    description: 'Cured under the sun in traditional earthenware jars (Bharanis) with native mustard oil and cold-pressed spices.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    details: {
      origin: 'South Karnataka Homesteads',
      ingredients: 'Local Lime, Rock Salt, Cold-Pressed Mustard Oil, Fenugreek, Red Chilli Powder, Turmeric, Asafoetida',
      shelfLife: '12 Months'
    }
  },
  {
    id: 'jaggery-01',
    name: 'Organic Sugarcane Jaggery',
    category: 'sweeteners',
    price: 120,
    description: 'Chemical-free jaggery blocks prepared by boiling fresh sugarcane juice. A healthy, mineral-rich alternative to white sugar.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    details: {
      origin: 'Srirangapatna Sugarcane Farms',
      ingredients: '100% Concentrated Sugarcane Juice',
      shelfLife: '12 Months'
    }
  }
];

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'spices', label: 'Spices & Pickles' },
    { id: 'pantry', label: 'Pantry Essentials' },
    { id: 'sweeteners', label: 'Natural Sweeteners' },
    { id: 'beverages', label: 'Beverages' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="section catalog" id="catalog">
      <div className="container">
        <div className="catalog-header">
          <span className="section-subtitle">Straight From Our Pantry</span>
          <h2 className="section-title">Explore Our Handcrafted Goods</h2>
        </div>

        <div className="catalog-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {filteredProducts.map(product => (
            <article className="product-card" key={product.id}>
              <div className="product-img-wrapper">
                <img 
                  className="product-img" 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                />
                {product.badge && (
                  <span className={`product-badge ${product.badgeType === 'accent' ? 'accent' : ''}`}>
                    {product.badge}
                  </span>
                )}
                <button 
                  className="product-quick-view"
                  onClick={() => onQuickView(product)}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                    <Eye size={16} /> Quick View
                  </span>
                </button>
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <button 
                    className="add-btn"
                    onClick={() => onAddToCart(product)}
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
