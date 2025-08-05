import React from 'react';
import { ShoppingBag, Truck, Heart, Leaf, Phone, Wrench } from 'lucide-react';

const services = [
  {
    id: '1',
    name: 'Grocery Delivery',
    icon: ShoppingBag,
    description: 'Fresh groceries delivered to your doorstep daily'
  },
  {
    id: '2',
    name: 'Medicine Supply',
    icon: Heart,
    description: 'Essential medicines and healthcare products'
  },
  {
    id: '3',
    name: 'Farm Equipment',
    icon: Wrench,
    description: 'Quality farming tools and equipment rental'
  },
  {
    id: '4',
    name: 'Organic Products',
    icon: Leaf,
    description: 'Locally sourced organic fruits and vegetables'
  },
  {
    id: '5',
    name: 'Emergency Delivery',
    icon: Truck,
    description: 'Urgent deliveries within 2 hours'
  },
  {
    id: '6',
    name: '24/7 Support',
    icon: Phone,
    description: 'Round-the-clock customer support'
  }
];

const Services = () => {
  return (
    <div id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive solutions for rural communities
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;