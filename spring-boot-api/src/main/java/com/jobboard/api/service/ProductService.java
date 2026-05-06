package com.jobboard.api.service;

import com.jobboard.api.dto.ProductRequest;
import com.jobboard.api.dto.ProductResponse;
import com.jobboard.api.entity.Brand;
import com.jobboard.api.entity.Product;
import com.jobboard.api.enums.ProductCategory;
import com.jobboard.api.exception.ResourceNotFoundException;
import com.jobboard.api.repository.BrandRepository;
import com.jobboard.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findByIsActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(ProductCategory category) {
        return productRepository.findByCategoryAndIsActiveTrue(category)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByBrand(Long brandId) {
        return productRepository.findByBrandIdAndIsActiveTrue(brandId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> searchProducts(String keyword) {
        return productRepository.searchByKeyword(keyword)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Brand brand = null;
        if (request.getBrandId() != null) {
            brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand", request.getBrandId()));
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .size(request.getSize())
                .abv(request.getAbv())
                .varietal(request.getVarietal())
                .region(request.getRegion())
                .category(request.getCategory())
                .brand(brand)
                .inventory(request.getInventory() != null ? request.getInventory() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .build();

        return toResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        Brand brand = null;
        if (request.getBrandId() != null) {
            brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand", request.getBrandId()));
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setSize(request.getSize());
        product.setAbv(request.getAbv());
        product.setVarietal(request.getVarietal());
        product.setRegion(request.getRegion());
        product.setCategory(request.getCategory());
        product.setBrand(brand);
        if (request.getInventory() != null) {
            product.setInventory(request.getInventory());
        }
        if (request.getIsActive() != null) {
            product.setIsActive(request.getIsActive());
        }
        if (request.getIsFeatured() != null) {
            product.setIsFeatured(request.getIsFeatured());
        }

        return toResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", id);
        }
        productRepository.deleteById(id);
    }

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .size(product.getSize())
                .abv(product.getAbv())
                .varietal(product.getVarietal())
                .region(product.getRegion())
                .category(product.getCategory())
                .brandId(product.getBrand() != null ? product.getBrand().getId() : null)
                .brandName(product.getBrand() != null ? product.getBrand().getName() : null)
                .brandCountry(product.getBrand() != null ? product.getBrand().getCountry() : null)
                .inventory(product.getInventory())
                .isActive(product.getIsActive())
                .isFeatured(product.getIsFeatured())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
