package com.ruralconnect.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200, message = "Product name must be between 2 and 200 characters")
    @Column(nullable = false)
    private String name;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private Boolean inStock = true;

    @Column(name = "stock_count")
    private Integer stockCount = 0;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Size(max = 2000, message = "Long description must be less than 2000 characters")
    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    @Size(max = 1000, message = "Uses must be less than 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String uses;

    @Size(max = 1000, message = "Benefits must be less than 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Size(max = 500, message = "Nutritional info must be less than 500 characters")
    @Column(name = "nutritional_info", columnDefinition = "TEXT")
    private String nutritionalInfo;

    @Size(max = 500, message = "Storage info must be less than 500 characters")
    @Column(name = "storage_info")
    private String storageInfo;

    @Size(max = 100, message = "Shelf life must be less than 100 characters")
    @Column(name = "shelf_life")
    private String shelfLife;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Product() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Product(String name, String description, BigDecimal price, String category) {
        this();
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
        this.updatedAt = LocalDateTime.now();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
        this.updatedAt = LocalDateTime.now();
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        this.updatedAt = LocalDateTime.now();
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
        this.updatedAt = LocalDateTime.now();
    }

    public Integer getStockCount() {
        return stockCount;
    }

    public void setStockCount(Integer stockCount) {
        this.stockCount = stockCount;
        this.updatedAt = LocalDateTime.now();
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
        this.updatedAt = LocalDateTime.now();
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
        this.updatedAt = LocalDateTime.now();
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
        this.updatedAt = LocalDateTime.now();
    }

    public String getUses() {
        return uses;
    }

    public void setUses(String uses) {
        this.uses = uses;
        this.updatedAt = LocalDateTime.now();
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
        this.updatedAt = LocalDateTime.now();
    }

    public String getNutritionalInfo() {
        return nutritionalInfo;
    }

    public void setNutritionalInfo(String nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
        this.updatedAt = LocalDateTime.now();
    }

    public String getStorageInfo() {
        return storageInfo;
    }

    public void setStorageInfo(String storageInfo) {
        this.storageInfo = storageInfo;
        this.updatedAt = LocalDateTime.now();
    }

    public String getShelfLife() {
        return shelfLife;
    }

    public void setShelfLife(String shelfLife) {
        this.shelfLife = shelfLife;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}