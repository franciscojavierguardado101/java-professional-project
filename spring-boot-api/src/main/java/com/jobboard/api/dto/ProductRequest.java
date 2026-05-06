package com.jobboard.api.dto;

import com.jobboard.api.enums.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    private BigDecimal price;

    private String imageUrl;
    private String size;
    private Double abv;
    private String varietal;
    private String region;

    @NotNull(message = "Category is required")
    private ProductCategory category;

    private Long brandId;
    private Integer inventory = 0;
    private Boolean isActive = true;
    private Boolean isFeatured = false;
}
