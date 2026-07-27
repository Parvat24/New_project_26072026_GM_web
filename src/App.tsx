import { useState, useEffect } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductCatalog } from './components/ProductCatalog';
import type { Product } from './components/ProductCatalog';
import { Heritage } from './components/Heritage';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        showToast(`Increased quantity of ${product.name} in your cart.`, 'success');
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`Added ${product.name} to your cart.`, 'success');
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name} from your cart.`, 'info');
    }
  };

  const handleCheckout = () => {
    showToast("Order placed successfully! Thank you for supporting Goudra Mane's heritage goods.", 'success');
    setCart([]);
    setIsCartOpen(false);
  };

  const handleSubscribe = (email: string) => {
    showToast(`Thank you! ${email} has been subscribed to Goudra Mane updates.`, 'success');
  };

  // Toast notifications
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app">
      <Navbar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main>
        <Hero />
        <Features />
        <ProductCatalog 
          onAddToCart={handleAddToCart} 
          onQuickView={(prod) => setSelectedProduct(prod)} 
        />
        <Heritage />
        <Testimonials />
      </main>

      <Footer onSubscribe={handleSubscribe} />

      {/* Cart Sidebar Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="modal-img-col">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="modal-info-col">
              <span className="product-category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <span className="price">₹{selectedProduct.price}</span>
              <p className="product-description" style={{ marginBottom: '24px' }}>
                {selectedProduct.description}
              </p>
              
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                style={{ width: 'fit-content', marginBottom: '30px' }}
              >
                Add to Cart
              </button>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-label">Origin:</span>
                  <span className="detail-value">{selectedProduct.details.origin}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ingredients:</span>
                  <span className="detail-value">{selectedProduct.details.ingredients}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Shelf Life:</span>
                  <span className="detail-value">{selectedProduct.details.shelfLife}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Layer */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' ? (
              <Check size={16} style={{ color: 'var(--color-success)' }} />
            ) : (
              <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
