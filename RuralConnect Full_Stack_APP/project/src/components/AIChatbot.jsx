import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { products } from '../data/products';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your RuralConnect AI assistant. I can help you with product information, prices, uses, and benefits. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Product search
    const foundProduct = products.find(product => 
      product.name.toLowerCase().includes(message) ||
      message.includes(product.name.toLowerCase().split(' ')[0]) ||
      message.includes(product.category.toLowerCase())
    );

    if (foundProduct) {
      return `Here's information about ${foundProduct.name}:

💰 Price: ₹${foundProduct.price}
📦 Weight: ${foundProduct.weight}
⭐ Rating: ${foundProduct.rating}/5 (${foundProduct.reviews} reviews)

🔸 Description: ${foundProduct.description}

🔸 Uses: ${foundProduct.uses.join(', ')}

🔸 Benefits: ${foundProduct.benefits.join(', ')}

🔸 Storage: ${foundProduct.storage}

Would you like to know more about any specific aspect?`;
    }

    // Price queries
    if (message.includes('price') || message.includes('cost')) {
      const productPrices = products.map(p => `${p.name}: ₹${p.price}`).join('\n');
      return `Here are our current product prices:\n\n${productPrices}\n\nAll prices are competitive and include quality assurance!`;
    }

    // Category queries
    if (message.includes('groceries') || message.includes('grocery')) {
      const groceries = products.filter(p => p.category === 'Groceries');
      const groceryList = groceries.map(p => `${p.name} - ₹${p.price}`).join('\n');
      return `Our grocery items:\n\n${groceryList}\n\nAll items are fresh and of premium quality!`;
    }

    if (message.includes('medicine') || message.includes('health')) {
      const medicines = products.filter(p => p.category === 'Medicine');
      const medicineList = medicines.map(p => `${p.name} - ₹${p.price}`).join('\n');
      return `Our healthcare products:\n\n${medicineList}\n\nAlways consult a doctor before taking any medication.`;
    }

    if (message.includes('dairy')) {
      const dairy = products.filter(p => p.category === 'Dairy');
      const dairyList = dairy.map(p => `${p.name} - ₹${p.price}`).join('\n');
      return `Our dairy products:\n\n${dairyList}\n\nAll dairy products are fresh and sourced from local farms!`;
    }

    if (message.includes('organic')) {
      const organic = products.filter(p => p.category === 'Organic');
      const organicList = organic.map(p => `${p.name} - ₹${p.price}`).join('\n');
      return `Our organic products:\n\n${organicList}\n\nCertified organic and naturally grown!`;
    }

    // General queries
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! Welcome to RuralConnect! I can help you with product information, prices, uses, and benefits. What would you like to know about our products?";
    }

    if (message.includes('help')) {
      return `I can help you with:
      
🛍️ Product information and details
💰 Pricing information
🏷️ Product categories (Groceries, Dairy, Medicine, Organic, Vegetables)
📋 Product uses and benefits
📦 Storage instructions
⭐ Ratings and reviews

Just ask me about any product or category!`;
    }

    if (message.includes('delivery') || message.includes('shipping')) {
      return "We offer fast delivery services:\n\n🚚 Standard delivery: 1-2 days\n⚡ Emergency delivery: Within 2 hours\n🆓 Free delivery on orders above ₹500\n\nDelivery fee: ₹50 for orders below ₹500";
    }

    // Default response
    return "I'd be happy to help! You can ask me about:\n\n• Specific products (rice, milk, vegetables, etc.)\n• Product prices and details\n• Uses and benefits\n• Storage instructions\n• Product categories\n\nWhat would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <div>
              <h3 className="font-semibold">RuralConnect AI</h3>
              <p className="text-sm opacity-90">Product Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0 order-2" />
                    )}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about products..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;