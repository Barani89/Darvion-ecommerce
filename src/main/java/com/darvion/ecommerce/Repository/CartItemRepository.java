package com.darvion.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);
    void deleteByCart(Cart cart);
}