package com.pbl5.fruitscalebackend.controller;

import com.pbl5.fruitscalebackend.dto.OrderRequest;
import com.pbl5.fruitscalebackend.entity.InventoryItem;
import com.pbl5.fruitscalebackend.entity.Order;
import com.pbl5.fruitscalebackend.entity.OrderStatus;
import com.pbl5.fruitscalebackend.entity.User;
import com.pbl5.fruitscalebackend.repository.InventoryRepository;
import com.pbl5.fruitscalebackend.repository.OrderRepository;
import com.pbl5.fruitscalebackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;


    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id ){
        Optional<Order> order = Optional.ofNullable(orderService.findOrderById(id));
        if (order.isPresent()){
            return ResponseEntity.ok(order.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Order>> searchOrder(
            @RequestParam String username,
            @RequestParam String phoneNumber) {
        List<Order> orders = orderService.findByUserNameAndPhone(username, phoneNumber);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (!orderOpt.isPresent()) return ResponseEntity.notFound().build();

        Order order = orderOpt.get();

        try {
            String statusStr = body.get("status");
            OrderStatus status = OrderStatus.valueOf(statusStr.toUpperCase());
            order.setStatus(status);
            orderRepository.save(order);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value. Allowed values: PENDING, PAID, CANCELLED, FAILED.");
        }
    }
}