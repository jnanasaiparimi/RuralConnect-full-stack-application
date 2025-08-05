package com.ruralconnect.controller;

import com.ruralconnect.dto.AddToCartRequest;
import com.ruralconnect.dto.CartItemResponse;
import com.ruralconnect.dto.UpdateQuantityRequest;
import com.ruralconnect.model.CartItem;
import com.ruralconnect.model.Product;
import com.ruralconnect.model.User;
import com.ruralconnect.service.CartService;
import com.ruralconnect.service.ProductService;
import com.ruralconnect.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping("/cart")
    public ResponseEntity<List<CartItemResponse>> getCartItems(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        List<CartItem> cartItems = cartService.getCartItems(user);
        
        List<CartItemResponse> response = cartItems.stream()
                .map(this::convertToCartItemResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@Valid @RequestBody AddToCartRequest request, 
                                      Authentication authentication) {
        try {
            User user = getUserFromAuthentication(authentication);
            Product product = productService.getProductById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            CartItem cartItem = cartService.addToCart(user, product, request.getQuantity());
            return ResponseEntity.ok(convertToCartItemResponse(cartItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/cart/update")
    public ResponseEntity<?> updateQuantity(@Valid @RequestBody UpdateQuantityRequest request,
                                           Authentication authentication) {
        try {
            User user = getUserFromAuthentication(authentication);
            Product product = productService.getProductById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            CartItem cartItem = cartService.updateQuantity(user, product, request.getQuantity());
            return ResponseEntity.ok(convertToCartItemResponse(cartItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/cart/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId,
                                           Authentication authentication) {
        try {
            User user = getUserFromAuthentication(authentication);
            Product product = productService.getProductById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            cartService.removeFromCart(user, product);
            return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    private User getUserFromAuthentication(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private CartItemResponse convertToCartItemResponse(CartItem cartItem) {
        CartItemResponse response = new CartItemResponse();
        response.setId(cartItem.getId());
        response.setProductId(cartItem.getProduct().getId());
        response.setName(cartItem.getProduct().getName());
        response.setPrice(cartItem.getProduct().getPrice());
        response.setImage(cartItem.getProduct().getImageUrl());
        response.setQuantity(cartItem.getQuantity());
        return response;
    }
}