package com.jobboard.api.repository;

import com.jobboard.api.entity.Product;
import com.jobboard.api.enums.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByCategoryAndIsActiveTrue(ProductCategory category);

    List<Product> findByIsFeaturedTrueAndIsActiveTrue();

    List<Product> findByBrandIdAndIsActiveTrue(Long brandId);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND (" +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.varietal) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.region) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Product> searchByKeyword(@Param("keyword") String keyword);
}
