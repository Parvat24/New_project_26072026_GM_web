import React from 'react';
import { ShieldAlert, Users, Compass } from 'lucide-react';

export const Heritage: React.FC = () => {
  return (
    <section className="section heritage" id="heritage" style={{ backgroundColor: '#ffffff' }}>
      <div className="container heritage-container">
        <div className="heritage-visual">
          <img 
            className="heritage-img-main" 
            src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800" 
            alt="Traditional grinding and raw ingredients" 
            loading="lazy"
          />
          <div className="heritage-badge-absolute">
            <span className="num">45+</span>
            <span className="label">Years of Heritage</span>
          </div>
        </div>

        <div className="heritage-content">
          <span className="section-subtitle">Our Heritage & Story</span>
          <h2>Rooted in Tradition, Crafted with Love</h2>
          <p className="lead">
            For over four decades, our family at Goudra Mane has been dedicated to preserving the rich culinary secrets of rural Karnataka.
          </p>
          <p>
            It all started in a humble farm kitchen in Mandya, where our grandmother cured pickles in earthenware jars and blended spices by hand. Today, we bring those same authentic tastes to your table. We support local farmers, prioritize organic practices, and maintain strict small-batch production.
          </p>
          
          <div className="heritage-bullets">
            <div className="bullet-item">
              <Compass className="bullet-icon" size={20} />
              <div className="bullet-text">
                <h4>Direct Sourcing from Local Farmers</h4>
                <p>We source raw ingredients directly from local agricultural families in Mandya, Coorg, and Malnad, ensuring fair trade and top quality.</p>
              </div>
            </div>
            
            <div className="bullet-item">
              <Users className="bullet-icon" size={20} />
              <div className="bullet-text">
                <h4>Empowering Rural Women</h4>
                <p>Our preparation units are run primarily by local rural women, providing them with livelihood opportunities and preserving traditional knowledge.</p>
              </div>
            </div>
            
            <div className="bullet-item">
              <ShieldAlert className="bullet-icon" size={20} />
              <div className="bullet-text">
                <h4>Honest, Clean Ingredients</h4>
                <p>No synthetic chemicals, MSG, or high-fructose corn syrups. Our products are naturally preserved with salt, oil, and spices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
