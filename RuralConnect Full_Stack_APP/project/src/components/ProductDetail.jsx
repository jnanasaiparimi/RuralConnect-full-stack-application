import React, { useState } from 'react';
import { ArrowLeft, Plus, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

const ProductDetail = ({ product, onAddToCart, onBack, user, onAuthClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    if (!user) {
      onAuthClick();
      return;
    }
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'uses', label: 'Uses' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'storage', label: 'Storage' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                <span className="text-gray-600 ml-2">per {product.weight}</span>
              </div>

              <p className="text-gray-700 mb-6 text-lg">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <label className="text-gray-700 font-medium mr-4">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Brand:</span>
                    <span className="ml-2 text-gray-600">{product.brand}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">{product.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                    <p className="text-gray-600">{product.ingredients}</p>
                  </div>
                </div>
              )}

              {activeTab === 'uses' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Uses</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.uses.map((use, index) => (
                      <li key={index} className="flex items-center">
                        <Plus className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Health Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'storage' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Storage Instructions</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{product.storage}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;