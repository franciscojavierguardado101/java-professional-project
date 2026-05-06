package com.jobboard.api.service;

import com.jobboard.api.dto.CompanyRequest;
import com.jobboard.api.dto.CompanyResponse;
import com.jobboard.api.entity.Company;
import com.jobboard.api.exception.ResourceNotFoundException;
import com.jobboard.api.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service marks this as a Spring-managed service bean
// @RequiredArgsConstructor (Lombok) injects dependencies via constructor — preferred over @Autowired
@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CompanyResponse getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", id));
        return toResponse(company);
    }

    public CompanyResponse createCompany(CompanyRequest request) {
        Company company = Company.builder()
                .name(request.getName())
                .logoUrl(request.getLogoUrl())
                .website(request.getWebsite())
                .description(request.getDescription())
                .build();
        return toResponse(companyRepository.save(company));
    }

    public CompanyResponse updateCompany(Long id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", id));
        company.setName(request.getName());
        company.setLogoUrl(request.getLogoUrl());
        company.setWebsite(request.getWebsite());
        company.setDescription(request.getDescription());
        return toResponse(companyRepository.save(company));
    }

    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company", id);
        }
        companyRepository.deleteById(id);
    }

    // Converts a Company entity → CompanyResponse DTO
    private CompanyResponse toResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .logoUrl(company.getLogoUrl())
                .website(company.getWebsite())
                .description(company.getDescription())
                .build();
    }
}
