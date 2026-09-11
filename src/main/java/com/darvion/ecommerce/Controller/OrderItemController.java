package com.darvion.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darvion.ecommerce.entity.Order;
import com.darvion.ecommerce.entity.OrderItem;
import com.darvion.ecommerce.repository.OrderRepository;
import com.darvion.ecommerce.service.OrderItemService;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    private final OrderItemService orderItemService;
    private final OrderRepository orderRepository;

    public OrderItemController(
            OrderItemService orderItemService,
            OrderRepository orderRepository) {

        this.orderItemService = orderItemService;
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.createOrderItem(orderItem);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {

        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return List.of();
        }

        return orderItemService.getOrderItems(order);
    }
}