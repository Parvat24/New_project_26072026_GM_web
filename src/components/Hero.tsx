import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        <div className="hero-badge">
          <Leaf className="hero-badge-icon" size={14} />
          <span>100% Organic & Handcrafted Heritage</span>
        </div>
        <h1 className="hero-title">
          Bringing Traditional Wholesomeness
          <span>From Our Home to Yours</span>
        </h1>
        <p className="hero-subtitle">
          Experience the authentic taste of generations-old recipes, pure native ingredients, and home-style products crafted with passion in the heart of Karnataka.
        </p>
        <div className="hero-buttons">
          <a href="#catalog" className="btn btn-primary">
            Shop Products
            <ArrowRight size={16} />
          </a>
          <a href="#heritage" className="btn btn-secondary">
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};
