import React from 'react';
import { Home, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({
  user,
  cartItemCount,
  onAuthClick,
  onLogout,
  onNavigate,
  currentPage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RuralConnect</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Home
              </button>
              <a href="#services" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </a>
              <a href="#products" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'dashboard'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  {user.name}
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
              >
                Home
              </button>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('cart');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({cartItemCount})
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;