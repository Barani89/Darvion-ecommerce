package com.darvion.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darvion.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}