package com.pbl5.fruitscalebackend.controller;

import com.pbl5.fruitscalebackend.dto.OrderRequest;
import com.pbl5.fruitscalebackend.entity.Order;
import com.pbl5.fruitscalebackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

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
}