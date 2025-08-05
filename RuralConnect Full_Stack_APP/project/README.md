# RuralConnect - Full Stack Rural Community Platform

RuralConnect is a comprehensive web platform designed to help rural communities easily find and access essential products like groceries, medicines, and more. The platform bridges the gap between rural areas and quality goods, making life easier for everyone in rural communities.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **User Authentication**: Secure signup/login system
- **Product Catalog**: Browse and search through various products
- **Shopping Cart**: Add, remove, and manage items in cart
- **Order Management**: Track orders and view order history
- **AI Assistant**: Real-time AI chat for product information and support
- **Contact System**: Contact form with real-time email notifications
- **User Dashboard**: Profile management and order history
- **Service Directory**: Comprehensive list of available services

### Backend Features
- **RESTful APIs**: Complete set of REST endpoints
- **JWT Authentication**: Secure token-based authentication
- **MySQL Database**: Robust data storage with JPA/Hibernate
- **Email Integration**: Real-time email notifications for contact forms
- **Cart Management**: Complete shopping cart functionality
- **Order Processing**: Full order lifecycle management
- **Security**: Spring Security with password encryption

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend
- **Spring Boot** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data access layer
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Spring Mail** - Email functionality
- **Maven** - Dependency management

## 📋 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products

### Cart Management
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/{productId}` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/checkout` - Create order from cart
- `GET /api/orders/{id}` - Get order details

### Services & Content
- `GET /api/services` - Get available services
- `GET /api/news` - Get news updates
- `POST /api/contact` - Submit contact form

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Database Setup
1. Install MySQL and create a database named `ruralconnect`
2. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Configure email settings in `application.properties`:
   ```properties
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_app_password
   ```

4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000`

## 📱 Key Features Walkthrough

### 1. Homepage
- Hero carousel with beautiful images
- Services showcase
- Featured products
- News and updates
- Contact information

### 2. Product Catalog
- Search and filter functionality
- Category-based browsing
- Product details with images
- Add to cart functionality

### 3. Shopping Cart
- View cart items
- Update quantities
- Remove items
- Checkout process

### 4. User Dashboard
- Profile management
- Order history
- Account settings

### 5. AI Assistant
- Real-time chat support
- Product information
- Pricing details
- Usage recommendations

### 6. Contact System
- Contact form
- Real-time email notifications
- FAQ section
- Business information

## 🏗️ Project Structure

```
ruralconnect/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── ...
│   └── ...
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/ruralconnect/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── dto/            # Data transfer objects
│   │   ├── security/       # Security configuration
│   │   └── ...
│   └── ...
└── README.md
```

## 🔧 Configuration

### Database Configuration
Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ruralconnect
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Email Configuration
```properties
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

## 🧪 Demo Credentials
For testing purposes, you can create an account or use these sample credentials:
- Email: demo@ruralconnect.com
- Password: demo123

## 🌐 Contact Information
- **Address**: Main Road Chinatadepalli, Tadepalligudem, West Godavari, AP, India
- **Phone**: +91 6281815552
- **Email**: jnanasai18@gmail.com

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### Backend Deployment
1. Package the application:
   ```bash
   cd backend && mvn clean package
   ```
2. Deploy the JAR file to your server

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- Thanks to all rural communities for inspiring this project
- Spring Boot and React.js communities for excellent documentation
- Pexels for providing high-quality stock photos

---

**RuralConnect** - Connecting Rural Communities with Essential Services 🌾