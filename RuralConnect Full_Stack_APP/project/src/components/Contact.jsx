import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission - in real app, this would send to backend
      // For demo purposes, we'll just show success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our team for any assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    Main Road Chinatadepalli<br />
                    Tadepalligudem, West Godavari<br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">+91 6281815552</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">jnanasai18@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-3">Operating Hours</h4>
              <div className="text-gray-600 space-y-1">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 mb-2">
                  <Send className="h-8 w-8 mx-auto" />
                </div>
                <h4 className="text-green-800 font-medium mb-2">Message Sent!</h4>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;