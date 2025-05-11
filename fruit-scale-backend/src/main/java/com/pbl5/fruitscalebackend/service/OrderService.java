package com.pbl5.fruitscalebackend.service;

import com.pbl5.fruitscalebackend.dto.OrderRequest;
import com.pbl5.fruitscalebackend.entity.*;
import com.pbl5.fruitscalebackend.repository.InventoryRepository;
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

    @Autowired
    private InventoryRepository inventoryRepository;

    public Order createOrder(OrderRequest request){
        User user = userRepository.findUserByUsername(request.getUserName().toString());
        System.out.println("user " + user);
        if (user == null){
            user = new User().builder().username(request.getUserName())
                    .phone(request.getPhoneNumber())
                    .build();
            user = userRepository.save(user);
        }
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

        for (OrderItem item : items){
            System.out.println("item " + item);
            InventoryItem inventoryItem = inventoryRepository.findByFruitName(item.getFruitName());
            if (inventoryItem != null){
                System.out.println("inventoryItem " + inventoryItem);
                double newQuantity = inventoryItem.getQuantityInKg() - item.getWeight();
                System.out.println("newQuantity " + newQuantity);
                if (newQuantity < 0) {
                    throw new RuntimeException("Not enough inventory for item: " + item.getFruitName());
                }
                inventoryItem.setQuantityInKg(newQuantity);
                inventoryItem.setLastUpdated(LocalDateTime.now());
                inventoryRepository.save(inventoryItem);
            } else {
                throw new RuntimeException("Inventory item not found for fruit: " + item.getFruitName());
            }
        }
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order findOrderById (String id){
        Optional<Order> dbOrder = orderRepository.findById(id);
        return dbOrder.orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + id));
    }

    public List<Order> findByUserNameAndPhone(String username, String phone) {
        User user = userRepository.findByUsernameAndPhone(username, phone);

        if (user == null) {
            throw new RuntimeException("User not found with username: " + username + " and phone: " + phone);
        }

        return orderRepository.findAllByUser(user);
    }
}
