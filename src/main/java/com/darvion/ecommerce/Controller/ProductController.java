package com.darvion.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darvion.ecommerce.entity.Product;
import com.darvion.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
public Product updateProduct(
        @PathVariable Long id,
        @RequestBody Product product) {

    Product existingProduct =
            productService.getProductById(id);

    if (existingProduct == null) {
        return null;
    }

    existingProduct.setName(product.getName());
    existingProduct.setDescription(product.getDescription());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setStock(product.getStock());
    existingProduct.setImageUrl(product.getImageUrl());

    return productService.createProduct(existingProduct);
}

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}