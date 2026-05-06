package com.jobboard.api.repository;

import com.jobboard.api.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// JpaRepository<Company, Long> gives us these methods for FREE — no SQL needed:
//   findAll(), findById(), save(), deleteById(), count(), existsById()...
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    // Spring Data reads the method name and generates the SQL automatically:
    // "SELECT * FROM companies WHERE name = ?"
    Optional<Company> findByName(String name);
}
