package com.darvion.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.CartItem;
import com.darvion.ecommerce.entity.Product;
import com.darvion.ecommerce.repository.CartItemRepository;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public CartItem addToCart(Cart cart, Product product, int quantity) {

        CartItem cartItem = new CartItem();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(Cart cart) {
        return cartItemRepository.findByCart(cart);
    }

    public void removeCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}