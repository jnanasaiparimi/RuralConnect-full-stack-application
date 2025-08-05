import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: '1',
    title: 'New Agricultural Subsidies Announced for Small Farmers',
    date: '2024-01-15',
    summary: 'Government announces new subsidy programs to support small-scale farmers with equipment and seeds.'
  },
  {
    id: '2',
    title: 'Mobile Health Clinics Expanding to Remote Villages',
    date: '2024-01-12',
    summary: 'Healthcare initiative brings medical services directly to underserved rural communities.'
  },
  {
    id: '3',
    title: 'Rural Internet Connectivity Project Launches',
    date: '2024-01-10',
    summary: 'High-speed internet infrastructure project aims to connect 100 villages by year-end.'
  }
];

const News = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            News & Updates
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the latest rural development news
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="flex items-center mb-3">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.summary}
              </p>
              <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;