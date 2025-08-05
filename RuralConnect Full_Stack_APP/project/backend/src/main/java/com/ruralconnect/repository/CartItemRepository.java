package com.ruralconnect.repository;

import com.ruralconnect.model.CartItem;
import com.ruralconnect.model.User;
import com.ruralconnect.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProduct(User user, Product product);
    void deleteByUser(User user);
    void deleteByUserAndProduct(User user, Product product);
}