package com.Nicole.ecommerce.dao;

import com.Nicole.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

// Anotacion Spring Boot para el servidor de Angular
@CrossOrigin("http://localhost:4200")
// Spring data JPA
public interface ProductRepository extends JpaRepository<Product, Long> {
}
