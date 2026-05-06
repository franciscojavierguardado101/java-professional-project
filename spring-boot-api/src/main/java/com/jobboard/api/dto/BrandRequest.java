package com.jobboard.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BrandRequest {

    @NotBlank(message = "Brand name is required")
    private String name;

    private String country;
    private String region;
    private String logoUrl;
}
