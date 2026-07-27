import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onSubscribe: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <>
      {/* Newsletter Bar */}
      <section className="section newsletter" id="newsletter">
        <div className="container newsletter-content">
          <h2>Join the Goudra Mane Family</h2>
          <p>Subscribe to receive traditional recipes, healthy living tips, and exclusive early-access discounts on our seasonal harvests.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email for newsletter"
            />
            <button type="submit" className="newsletter-submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="footer" id="footer">
        <div className="container footer-grid">
          
          <div className="footer-col footer-about">
            <h3>Goudra Mane</h3>
            <p>Preserving generations of heritage recipes, chemical-free native food products, and traditional culinary craftsmanship. Handcrafted with love from our farm to your home.</p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#catalog">Shop Catalog</a></li>
              <li><a href="#heritage">Our Heritage</a></li>
              <li><a href="#testimonials">Reviews</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Policy Links</h3>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-col contact-info">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <MapPin className="contact-icon" size={18} />
              <span>Goudra Mane Homestead, Mandya District, Karnataka - 571401</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" size={18} />
              <span>+91 98450 12345</span>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" size={18} />
              <span>contact@goudramane.com</span>
            </div>
          </div>

        </div>

        <div className="container footer-bottom">
          <p>&copy; {new Date().getFullYear()} Goudra Mane E-Commerce. All Rights Reserved. Crafted with pride in Karnataka.</p>
        </div>
      </footer>
    </>
  );
};
