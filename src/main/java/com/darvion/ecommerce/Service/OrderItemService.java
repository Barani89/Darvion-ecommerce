package com.darvion.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darvion.ecommerce.entity.Order;
import com.darvion.ecommerce.entity.OrderItem;
import com.darvion.ecommerce.repository.OrderItemRepository;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getOrderItems(Order order) {
        return orderItemRepository.findByOrder(order);
    }
}