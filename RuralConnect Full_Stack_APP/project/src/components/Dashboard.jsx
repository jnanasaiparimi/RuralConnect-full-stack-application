import React, { useState } from 'react';
import { User, Edit3, Package, Clock, MapPin, Phone, Mail } from 'lucide-react';

const Dashboard = ({ user, orderHistory, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address
  });

  const handleSave = () => {
    onUpdateProfile({
      ...user,
      ...editForm
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const totalOrders = orderHistory.length;
  const totalSpent = orderHistory.reduce((total, order) => 
    total + order.reduce((orderTotal, item) => orderTotal + (item.product.price * item.quantity), 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <span className="text-gray-900">{user.address || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-semibold text-gray-900">{totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-semibold text-green-600">₹{totalSpent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-semibold text-gray-900">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
              </div>

              {orderHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                  <p className="text-gray-400 text-sm">Your order history will appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orderHistory.map((order, index) => {
                    const orderTotal = order.reduce((total, item) => total + (item.product.price * item.quantity), 0);
                    const orderDate = new Date();
                    orderDate.setDate(orderDate.getDate() - index);

                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              Order #{index + 1} - {orderDate.toLocaleDateString()}
                            </span>
                          </div>
                          <span className="font-semibold text-green-600">₹{orderTotal}</span>
                        </div>
                        <div className="space-y-2">
                          {order.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between text-sm">
                              <span className="text-gray-900">
                                {item.product.name} × {item.quantity}
                              </span>
                              <span className="text-gray-600">₹{item.product.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;