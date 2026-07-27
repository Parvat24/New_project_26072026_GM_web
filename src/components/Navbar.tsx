import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <img className="logo-img" src="/logo.png" alt="Goudra Mane Logo" />
          <span>Goudra Mane</span>
        </a>

        <nav>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#catalog">Products</a></li>
            <li><a href="#heritage">Our Story</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            className="cart-btn" 
            onClick={onCartClick} 
            aria-label="Shopping Cart"
            id="cart-toggle-btn"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="mobile-menu-btn" aria-label="Open Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
