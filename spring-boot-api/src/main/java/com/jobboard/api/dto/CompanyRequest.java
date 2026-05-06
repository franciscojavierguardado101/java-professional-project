package com.jobboard.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// What the client sends when creating or updating a company
@Data
public class CompanyRequest {

    @NotBlank(message = "Company name is required")
    private String name;

    private String logoUrl;
    private String website;
    private String description;
}
