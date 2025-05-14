package com.pbl5.fruitscalebackend.controller;

import com.pbl5.fruitscalebackend.entity.InventoryItem;
import com.pbl5.fruitscalebackend.repository.InventoryRepository;
import com.pbl5.fruitscalebackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @PutMapping("/{fruitName}/add")
    public ResponseEntity<?> addStock(@PathVariable String fruitName, @RequestBody double amount) {
        InventoryItem item = inventoryService.addStock(fruitName, amount);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(item);
    }

    @PutMapping("/{fruitName}/price")
    public ResponseEntity<?> updatePriceProduct(@PathVariable String fruitName, @RequestBody double price) {
        InventoryItem item = inventoryService.updatePrice(fruitName, price);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(item);
    }

    @GetMapping
    public List<InventoryItem> getAllInventory() {
        return inventoryService.getAllInventoryItems();
    }
}
