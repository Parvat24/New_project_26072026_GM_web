import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import type { Product } from './ProductCatalog';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + delivery;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-content">
        <div className="drawer-header">
          <h3 className="drawer-title">
            <ShoppingCart size={20} className="logo-icon" />
            <span>Shopping Cart ({cartItems.length})</span>
          </h3>
          <button className="close-btn" onClick={onClose} aria-label="Close Cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart className="empty-cart-icon" size={60} />
              <h4>Your cart is empty</h4>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button 
                className="btn btn-primary" 
                onClick={onClose} 
                style={{ marginTop: '16px', padding: '10px 24px', fontSize: '14px' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item.product.id}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    <span className="cart-item-price">₹{item.product.price}</span>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button 
                        className="remove-btn"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery Fee</span>
              <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>
            {delivery > 0 && (
              <p style={{ fontSize: '11px', color: 'var(--color-text-light)', marginTop: '-4px', marginBottom: '8px' }}>
                Add ₹{500 - subtotal} more for FREE delivery
              </p>
            )}
            <div className="cart-summary-row total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            
            <button className="checkout-btn" onClick={onCheckout}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
