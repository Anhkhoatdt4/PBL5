package com.pbl5.fruitscalebackend.service;

import com.pbl5.fruitscalebackend.dto.OrderRequest;
import com.pbl5.fruitscalebackend.entity.Order;
import com.pbl5.fruitscalebackend.entity.OrderItem;
import com.pbl5.fruitscalebackend.entity.OrderStatus;
import com.pbl5.fruitscalebackend.entity.User;
import com.pbl5.fruitscalebackend.repository.OrderRepository;
import com.pbl5.fruitscalebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(OrderRequest request){
        User user = userRepository.findUserByUsername(request.getUserName().toString());
        System.out.println("user " + user);
        List<OrderItem> items = request.getItems().stream()
                .map(item -> OrderItem.builder()
                        .fruitName(item.getFruitName())
                        .weight(item.getWeight())
                        .pricePerKg(item.getPricePerKg())
                        .totalPrice(item.getWeight() * item.getPricePerKg())
                        .imageUrl(item.getImageUrl())
                        .build())
                .collect(Collectors.toList());

        double totalPrice = items.stream().mapToDouble(OrderItem::getTotalPrice).sum();

        Order order = Order.builder()
                .createdAt(LocalDateTime.now())
                .totalPrice(totalPrice)
                .status(OrderStatus.PAID)
                .items(items)
                .user(user)
                .build();

        items.forEach(item -> item.setOrder(order));
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order findOrderById (String id){
        Optional<Order> dbOrder = orderRepository.findById(id);
        return dbOrder.orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + id));
    }
}
