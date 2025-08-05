package com.ruralconnect.repository;

import com.ruralconnect.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByInStock(Boolean inStock);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Product> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.inStock = true")
    List<Product> findAvailableProductsByCategory(@Param("category") String category);
}