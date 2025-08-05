package com.ruralconnect.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class OrderResponse {
    private Long id;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private List<Map<String, Object>> items;

    // Constructors
    public OrderResponse() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Map<String, Object>> getItems() {
        return items;
    }

    public void setItems(List<Map<String, Object>> items) {
        this.items = items;
    }
}