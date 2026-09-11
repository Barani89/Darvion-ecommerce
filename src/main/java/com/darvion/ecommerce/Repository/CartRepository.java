package com.darvion.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUser(User user);
}