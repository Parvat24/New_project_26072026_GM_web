import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

export const Testimonials: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      id: 'rev-01',
      name: 'Ananya Hegde',
      role: 'Home Cook, Bangalore',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: "The Bilona Cow Ghee from Goudra Mane smells exactly like the ghee my grandmother used to make in our village home. The aroma fills the entire house when I heat it! Truly authentic."
    },
    {
      id: 'rev-02',
      name: 'Dr. Ramesh Gowda',
      role: 'Wellness Consultant, Mysore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: "Finding chemical-free jaggery is hard these days. Goudra Mane's Sugarcane Jaggery is clean, has the perfect texture, and is sweet without the sulfur taste. Highly recommend their products!"
    },
    {
      id: 'rev-03',
      name: 'Deepa Srinivas',
      role: 'IT Professional, Bangalore',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: "Their Coorg filter coffee is a game changer for my mornings. It has the perfect bold body and traditional chicory blend. Also, their packaging is eco-friendly and premium!"
    }
  ];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="catalog-header">
          <span className="section-subtitle">Customer Voices</span>
          <h2 className="section-title">Loved by Generations</h2>
        </div>

        <div className="testimonials-grid">
          {reviews.map(review => (
            <div className="testimonial-card" key={review.id}>
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">"{review.text}"</p>
              
              <div className="testimonial-user">
                <img 
                  className="user-avatar" 
                  src={review.image} 
                  alt={review.name} 
                  loading="lazy"
                />
                <div>
                  <h4 className="user-name">{review.name}</h4>
                  <span className="user-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
