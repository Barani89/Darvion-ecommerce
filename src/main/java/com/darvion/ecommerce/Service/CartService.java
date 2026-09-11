package com.darvion.ecommerce.service;

import org.springframework.stereotype.Service;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.repository.CartRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart getCart(User user) {

        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        return cart;
    }
}