package com.jobboard.api.dto;

import com.jobboard.api.enums.ProductCategory;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private String size;
    private Double abv;
    private String varietal;
    private String region;
    private ProductCategory category;
    private Long brandId;
    private String brandName;
    private String brandCountry;
    private Integer inventory;
    private Boolean isActive;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
}
