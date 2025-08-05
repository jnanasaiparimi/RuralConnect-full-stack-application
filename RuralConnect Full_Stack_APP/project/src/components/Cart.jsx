import React from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  user
}) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <a
              href="#products"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      <p className="text-green-600 font-semibold">₹{item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{item.product.price * item.quantity}</p>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 transition-colors mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{500 - subtotal} more for free delivery
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <button
                  onClick={onCheckout}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please login to checkout</p>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Login to Checkout
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center text-sm text-gray-600">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>Safe and secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;