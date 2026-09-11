package com.darvion.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.darvion.ecommerce.entity.Cart;
import com.darvion.ecommerce.entity.CartItem;
import com.darvion.ecommerce.entity.Order;
import com.darvion.ecommerce.entity.OrderItem;
import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.repository.CartItemRepository;
import com.darvion.ecommerce.repository.OrderItemRepository;
import com.darvion.ecommerce.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CartItemRepository cartItemRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Order createOrder(Order order) {

        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order checkout(Cart cart) {

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) {
            return null;
        }

        double totalAmount = 0;

        for (CartItem cartItem : cartItems) {

            totalAmount +=
                    cartItem.getProduct().getPrice()
                    * cartItem.getQuantity();
        }

        Order order = new Order();

        order.setUser(cart.getUser());
        order.setTotalAmount(totalAmount);
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        order = orderRepository.save(order);

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            orderItemRepository.save(orderItem);
        }

        cartItemRepository.deleteByCart(cart);

        return order;
    }
}