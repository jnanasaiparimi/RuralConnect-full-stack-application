package com.ruralconnect.repository;

import com.ruralconnect.model.Order;
import com.ruralconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    List<Order> findByStatus(Order.OrderStatus status);
}