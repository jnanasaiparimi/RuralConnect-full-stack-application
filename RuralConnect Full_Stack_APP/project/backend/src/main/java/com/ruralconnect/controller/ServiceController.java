package com.ruralconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ServiceController {

    @GetMapping("/services")
    public ResponseEntity<List<Map<String, Object>>> getServices() {
        List<Map<String, Object>> services = List.of(
            Map.of(
                "id", 1,
                "name", "Grocery Delivery",
                "description", "Fresh groceries delivered to your doorstep within hours",
                "icon", "🛒",
                "features", List.of(
                    "Same-day delivery available",
                    "Fresh produce selection",
                    "Quality guaranteed",
                    "Contactless delivery option"
                ),
                "pricing", "Free delivery on orders above ₹500",
                "availability", "6 AM - 10 PM daily"
            ),
            Map.of(
                "id", 2,
                "name", "Medicine Supply",
                "description", "Essential medicines and healthcare products for rural communities",
                "icon", "💊",
                "features", List.of(
                    "Prescription medicines",
                    "Over-the-counter drugs",
                    "Health supplements",
                    "Medical equipment"
                ),
                "pricing", "Competitive pricing with discounts",
                "availability", "24/7 emergency service"
            ),
            Map.of(
                "id", 3,
                "name", "Agricultural Tools",
                "description", "Quality farming equipment and tools for better productivity",
                "icon", "🚜",
                "features", List.of(
                    "Modern farming tools",
                    "Equipment rental service",
                    "Maintenance support",
                    "Training included"
                ),
                "pricing", "Flexible payment options",
                "availability", "Monday to Saturday"
            ),
            Map.of(
                "id", 4,
                "name", "Fresh Produce",
                "description", "Farm-fresh vegetables and fruits directly from local farmers",
                "icon", "🥬",
                "features", List.of(
                    "Organic options available",
                    "Seasonal specialties",
                    "Bulk orders for events",
                    "Direct from farm"
                ),
                "pricing", "Market competitive rates",
                "availability", "5 AM - 8 PM daily"
            ),
            Map.of(
                "id", 5,
                "name", "Household Items",
                "description", "Daily essentials and household products for comfortable living",
                "icon", "🏠",
                "features", List.of(
                    "Cleaning supplies",
                    "Personal care items",
                    "Kitchen essentials",
                    "Home improvement products"
                ),
                "pricing", "Bulk discount available",
                "availability", "7 AM - 9 PM daily"
            )
        );

        return ResponseEntity.ok(services);
    }
}