package com.Nicole.ecommerce.dao;

import com.Nicole.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

// Anotacion Spring Boot para el servidor de Angular
@CrossOrigin("http://localhost:4200")
// Spring data JPA
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Consulta a la API por ID
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);


    // Consulta a la API - Buscador
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
