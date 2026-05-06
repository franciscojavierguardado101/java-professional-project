package com.jobboard.api.dto;

import lombok.Builder;
import lombok.Data;

// What the API sends back to the client
@Data
@Builder
public class CompanyResponse {
    private Long id;
    private String name;
    private String logoUrl;
    private String website;
    private String description;
}
