package com.pbl5.fruitscalebackend.service;

import com.pbl5.fruitscalebackend.entity.InventoryItem;
import com.pbl5.fruitscalebackend.repository.InventoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    @PostConstruct
    public void seedInitialInventory() {
        addIfNotExists("Apples", 100, 35000);
        addIfNotExists("Bananas", 120, 18000);
        addIfNotExists("Grapes", 80, 60000);
        addIfNotExists("Oranges", 90, 40000);
        addIfNotExists("Strawberries", 50, 90000);
        addIfNotExists("Watermelons", 150, 12000);
        addIfNotExists("Pineapples", 70, 25000);
        addIfNotExists("Tomatoes", 110, 22000);
    }

    private void addIfNotExists(String fruitName, int quantity, int pricePerKg) {
        if (inventoryRepository.findByFruitName(fruitName) == null) {
            InventoryItem item = new InventoryItem();
            item.setFruitName(fruitName);
            item.setQuantityInKg(quantity);
            item.setPricePerKg(pricePerKg);
            item.setLastUpdated(LocalDateTime.now());
            inventoryRepository.save(item);
        }
    }

    public InventoryItem addStock(String fruitName , double amount) {
        InventoryItem item = inventoryRepository.findByFruitName(fruitName);
        item.setQuantityInKg(item.getQuantityInKg() + amount);
        item.setLastUpdated(LocalDateTime.now());
        inventoryRepository.save(item);
        return inventoryRepository.findByFruitName(fruitName);
    }

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem updatePrice(String fruitName, double price) {
        InventoryItem item = inventoryRepository.findByFruitName(fruitName);
        System.out.println("item " + item);
        item.setPricePerKg((int) price);
        item.setLastUpdated(LocalDateTime.now());
        inventoryRepository.save(item);
        return inventoryRepository.findByFruitName(fruitName);
    }
}
