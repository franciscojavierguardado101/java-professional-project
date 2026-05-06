package com.jobboard.api.service;

import com.jobboard.api.dto.BrandRequest;
import com.jobboard.api.dto.BrandResponse;
import com.jobboard.api.entity.Brand;
import com.jobboard.api.exception.ResourceNotFoundException;
import com.jobboard.api.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public List<BrandResponse> getAllBrands() {
        return brandRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BrandResponse getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", id));
        return toResponse(brand);
    }

    @Transactional
    public BrandResponse createBrand(BrandRequest request) {
        Brand brand = Brand.builder()
                .name(request.getName())
                .country(request.getCountry())
                .region(request.getRegion())
                .logoUrl(request.getLogoUrl())
                .build();
        return toResponse(brandRepository.save(brand));
    }

    @Transactional
    public BrandResponse updateBrand(Long id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", id));
        brand.setName(request.getName());
        brand.setCountry(request.getCountry());
        brand.setRegion(request.getRegion());
        brand.setLogoUrl(request.getLogoUrl());
        return toResponse(brandRepository.save(brand));
    }

    @Transactional
    public void deleteBrand(Long id) {
        if (!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand", id);
        }
        brandRepository.deleteById(id);
    }

    private BrandResponse toResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .country(brand.getCountry())
                .region(brand.getRegion())
                .logoUrl(brand.getLogoUrl())
                .build();
    }
}
