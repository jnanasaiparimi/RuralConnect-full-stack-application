package com.ruralconnect.service;

import com.ruralconnect.model.*;
import com.ruralconnect.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrderFromCart(User user) {
        List<CartItem> cartItems = cartService.getCartItems(user);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = cartItems.stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order(user, totalAmount, user.getAddress(), user.getPhone());
        order = orderRepository.save(order);

        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> new OrderItem(order, cartItem.getProduct(), 
                        cartItem.getQuantity(), cartItem.getProduct().getPrice()))
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);
        order = orderRepository.save(order);

        // Clear cart after creating order
        cartService.clearCart(user);

        return order;
    }

    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(status);
            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found");
        }
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
}