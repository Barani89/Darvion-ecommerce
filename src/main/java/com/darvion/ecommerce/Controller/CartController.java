package com.darvion.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.CartItem;
import com.darvion.ecommerce.entity.Product;
import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.repository.ProductRepository;
import com.darvion.ecommerce.repository.UserRepository;
import com.darvion.ecommerce.service.CartItemService;
import com.darvion.ecommerce.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartController(
            CartService cartService,
            CartItemService cartItemService,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/add")
    public CartItem addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {

        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if (user == null || product == null) {
            return null;
        }

        Cart cart = cartService.getCart(user);

        return cartItemService.addToCart(
                cart,
                product,
                quantity
        );
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return List.of();
        }

        Cart cart = cartService.getCart(user);

        return cartItemService.getCartItems(cart);
    }

    @DeleteMapping("/remove/{id}")
    public String removeFromCart(@PathVariable Long id) {

        cartItemService.removeCartItem(id);

        return "Cart item removed successfully";
    }
}