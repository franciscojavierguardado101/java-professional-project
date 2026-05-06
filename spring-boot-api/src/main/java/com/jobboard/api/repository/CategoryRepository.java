package com.jobboard.api.repository;

import com.jobboard.api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // "SELECT * FROM categories WHERE slug = ?"
    Optional<Category> findBySlug(String slug);
}
