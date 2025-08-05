package com.ruralconnect.controller;

import com.ruralconnect.model.Product;
import com.ruralconnect.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        // Return sample data if database is empty
        List<Product> products = productService.getAllProducts();
        if (products.isEmpty()) {
            products = getSampleProducts();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            // Return sample product if not found
            Product sampleProduct = getSampleProductById(id);
            if (sampleProduct != null) {
                return ResponseEntity.ok(sampleProduct);
            }
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }

    private List<Product> getSampleProducts() {
        return List.of(
            createSampleProduct(1L, "Fresh Rice (5kg)", "Premium quality basmati rice sourced directly from local farmers", 
                new BigDecimal("250"), "grains", "https://images.pexels.com/photos/1123552/pexels-photo-1123552.jpeg",
                "Our premium basmati rice is carefully selected from the finest paddies in rural farming communities. Each grain is aged to perfection, ensuring the distinctive aroma and fluffy texture that basmati is famous for.",
                "Daily cooking and meals; Making rice dishes and pulao; Biryani and special occasions; Rice pudding and desserts",
                "Rich in carbohydrates for energy; Gluten-free and easy to digest; Low in fat and sodium; Contains essential vitamins and minerals",
                "Calories: 130 per 100g, Carbohydrates: 28g, Protein: 2.7g, Fat: 0.3g, Fiber: 0.4g",
                "Store in a cool, dry place in an airtight container. Keep away from moisture and direct sunlight.",
                "12 months from manufacturing date"),
                
            createSampleProduct(2L, "Whole Wheat (10kg)", "Fresh whole wheat flour, stone-ground to preserve nutrients", 
                new BigDecimal("400"), "grains", "https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg",
                "Our whole wheat flour is stone-ground from premium wheat grains to preserve maximum nutrition and flavor. Rich in fiber, protein, and essential nutrients.",
                "Making chapati and roti; Bread and baking; Pasta and noodle preparation; Healthy cooking and recipes",
                "High in fiber for digestive health; Rich in protein and B vitamins; Helps maintain blood sugar levels; Supports heart health",
                "Calories: 340 per 100g, Carbohydrates: 72g, Protein: 12g, Fat: 2.2g, Fiber: 11g",
                "Store in an airtight container in a cool, dry place. Use within 3-4 months for best quality.",
                "6 months from manufacturing date"),
                
            createSampleProduct(3L, "Mixed Dal (2kg)", "Mix of different lentils including toor, moong, and chana dal", 
                new BigDecimal("180"), "groceries", "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
                "A perfect blend of premium quality lentils providing complete nutrition. This mix includes toor dal, moong dal, and chana dal for varied taste and nutrition.",
                "Daily dal preparation; Protein source for meals; Curry making; Soup preparation",
                "Excellent source of protein; High in fiber and minerals; Supports muscle health; Aids in digestion",
                "Calories: 340 per 100g, Carbohydrates: 60g, Protein: 24g, Fat: 1.5g, Fiber: 11g",
                "Keep in airtight container to prevent insects. Store in cool, dry place.",
                "12 months from manufacturing date"),
                
            createSampleProduct(4L, "Fresh Vegetables Bundle", "Seasonal fresh vegetables sourced from local farms", 
                new BigDecimal("120"), "vegetables", "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg",
                "A variety pack of fresh, seasonal vegetables including tomatoes, onions, potatoes, green leafy vegetables, and more. All sourced from local organic farms.",
                "Daily cooking; Salad preparation; Curry and stir-fry dishes; Healthy meal preparation",
                "Rich in vitamins and minerals; High in antioxidants; Supports immune system; Low in calories",
                "Various nutrients depending on vegetables included, High in Vitamin C, Fiber, Potassium",
                "Store in refrigerator. Use within 3-5 days for best freshness.",
                "Best consumed within 1 week"),
                
            createSampleProduct(5L, "Cooking Oil (1L)", "Pure sunflower oil for healthy cooking", 
                new BigDecimal("90"), "groceries", "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg",
                "Premium quality sunflower oil that is heart-healthy and perfect for all types of cooking. Rich in Vitamin E and low in saturated fats.",
                "Daily cooking; Deep frying; Salad dressing; Baking",
                "Heart-healthy oil; Rich in Vitamin E; Low in saturated fats; Light taste",
                "Calories: 884 per 100ml, Fat: 100g, Vitamin E: High, No cholesterol",
                "Store in cool, dark place away from direct sunlight. Keep bottle tightly closed.",
                "18 months from manufacturing date"),
                
            createSampleProduct(6L, "Organic Honey (500g)", "Pure organic honey from local beekeepers", 
                new BigDecimal("300"), "organic", "https://images.pexels.com/photos/1638336/pexels-photo-1638336.jpeg",
                "100% pure organic honey harvested from local beehives. No artificial additives or processing. Rich in antioxidants and natural enzymes.",
                "Natural sweetener; Health remedy; Baking and cooking; Face masks and skin care",
                "Natural antibiotics; Rich in antioxidants; Boosts immunity; Natural energy source",
                "Calories: 304 per 100g, Carbohydrates: 82g, Natural sugars, Minerals and vitamins",
                "Store at room temperature. Do not refrigerate. Keep away from moisture.",
                "2 years from harvest date")
        );
    }

    private Product createSampleProduct(Long id, String name, String description, BigDecimal price, 
                                      String category, String imageUrl, String longDescription,
                                      String uses, String benefits, String nutritionalInfo,
                                      String storageInfo, String shelfLife) {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        product.setInStock(true);
        product.setStockCount(50);
        product.setRating(new BigDecimal("4.5"));
        product.setReviewCount(128);
        product.setLongDescription(longDescription);
        product.setUses(uses);
        product.setBenefits(benefits);
        product.setNutritionalInfo(nutritionalInfo);
        product.setStorageInfo(storageInfo);
        product.setShelfLife(shelfLife);
        return product;
    }

    private Product getSampleProductById(Long id) {
        List<Product> sampleProducts = getSampleProducts();
        return sampleProducts.stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}