import React from 'react';
import { ArrowRight, Heart, Users, Truck } from 'lucide-react';

const Hero = ({ user, onAuthClick }) => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connecting</span>{' '}
                <span className="block text-green-600 xl:inline">Rural Communities</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your trusted platform for accessing essential products and services in rural areas. 
                From groceries to medicines, we bring everything you need right to your doorstep.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  {user ? (
                    <a
                      href="#products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  ) : (
                    <button
                      onClick={onAuthClick}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Rural community market with fresh vegetables"
        />
      </div>
      
      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">1000+</p>
              <p className="text-gray-600">Orders Delivered</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">50+</p>
              <p className="text-gray-600">Villages Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;