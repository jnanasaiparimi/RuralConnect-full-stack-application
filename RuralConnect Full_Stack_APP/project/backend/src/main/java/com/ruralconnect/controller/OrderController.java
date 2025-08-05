package com.ruralconnect.controller;

import com.ruralconnect.dto.OrderResponse;
import com.ruralconnect.model.Order;
import com.ruralconnect.model.User;
import com.ruralconnect.service.OrderService;
import com.ruralconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getUserOrders(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        List<Order> orders = orderService.getUserOrders(user);
        
        List<OrderResponse> response = orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Authentication authentication) {
        try {
            User user = getUserFromAuthentication(authentication);
            Order order = orderService.createOrderFromCart(user);
            
            return ResponseEntity.ok(Map.of(
                "message", "Order placed successfully",
                "orderId", order.getId(),
                "totalAmount", order.getTotalAmount()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id, 
                                                     Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check if order belongs to the authenticated user
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.forbidden().build();
        }

        return ResponseEntity.ok(convertToOrderResponse(order));
    }

    private User getUserFromAuthentication(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private OrderResponse convertToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus().toString());
        response.setCreatedAt(order.getCreatedAt());
        
        if (order.getOrderItems() != null) {
            response.setItems(order.getOrderItems().stream()
                    .map(item -> Map.of(
                        "name", item.getProduct().getName(),
                        "quantity", item.getQuantity(),
                        "price", item.getPrice()
                    ))
                    .collect(Collectors.toList()));
        }
        
        return response;
    }
}