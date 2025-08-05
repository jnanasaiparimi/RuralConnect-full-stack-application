package com.ruralconnect.service;

import com.ruralconnect.model.CartItem;
import com.ruralconnect.model.Product;
import com.ruralconnect.model.User;
import com.ruralconnect.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(User user, Product product, Integer quantity) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProduct(user, product);
        
        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem = new CartItem(user, product, quantity);
            return cartItemRepository.save(cartItem);
        }
    }

    public CartItem updateQuantity(User user, Product product, Integer quantity) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProduct(user, product);
        
        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart item not found");
        }
    }

    public void removeFromCart(User user, Product product) {
        cartItemRepository.deleteByUserAndProduct(user, product);
    }

    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }
}