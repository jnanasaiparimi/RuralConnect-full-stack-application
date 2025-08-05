import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import AIChatbot from './components/AIChatbot';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ruralconnect_user');
    const savedCart = localStorage.getItem('ruralconnect_cart');
    const savedOrders = localStorage.getItem('ruralconnect_orders');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      setOrderHistory(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ruralconnect_cart', JSON.stringify(cart));
  }, [cart]);

  // Save order history to localStorage
  useEffect(() => {
    localStorage.setItem('ruralconnect_orders', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const handleLogin = (userData) => {
    // Simulate login - in real app, this would call an API
    const newUser = {
      id: Date.now().toString(),
      name: userData.email.split('@')[0],
      email: userData.email,
      phone: '',
      address: ''
    };
    setUser(newUser);
    localStorage.setItem('ruralconnect_user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleSignup = (userData) => {
    // Simulate signup - in real app, this would call an API
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: ''
    };
    setUser(newUser);
    localStorage.setItem('ruralconnect_user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ruralconnect_user');
    setCurrentPage('home');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const checkout = () => {
    if (cart.length > 0) {
      setOrderHistory(prev => [...prev, cart]);
      setCart([]);
      alert('Order placed successfully!');
    }
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('ruralconnect_user', JSON.stringify(updatedUser));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <HomePage
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
        />
      )}

      {currentPage === 'product-detail' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={addToCart}
          onBack={handleBackToHome}
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <Dashboard
          user={user}
          orderHistory={orderHistory}
          onUpdateProfile={updateUserProfile}
        />
      )}

      {currentPage === 'cart' && (
        <Cart
          cartItems={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={checkout}
          user={user}
        />
      )}

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onSwitchMode={setAuthMode}
        />
      )}

      <AIChatbot />
    </div>
  );
}

export default App;