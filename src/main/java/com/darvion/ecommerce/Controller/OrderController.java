package com.darvion.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.Order;
import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.repository.CartRepository;
import com.darvion.ecommerce.repository.UserRepository;
import com.darvion.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    public OrderController(
            OrderService orderService,
            UserRepository userRepository,
            CartRepository cartRepository) {

        this.orderService = orderService;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return List.of();
        }

        return orderService.getUserOrders(user);
    }

    @PostMapping("/checkout/{userId}")
    public Order checkout(@PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            return null;
        }

        return orderService.checkout(cart);
    }
}