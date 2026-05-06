package com.jobboard.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "companies")
@Data                  // Lombok: generates getters, setters, equals, hashCode, toString
@NoArgsConstructor     // Lombok: generates a no-arg constructor (required by JPA)
@AllArgsConstructor    // Lombok: generates a constructor with all fields
@Builder               // Lombok: lets us build objects like Company.builder().name("Google").build()
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment (1, 2, 3...)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(name = "logo_url")
    private String logoUrl;

    private String website;

    @Column(columnDefinition = "TEXT") // stores longer text than VARCHAR
    private String description;
}
