package com.pbl5.fruitscalebackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "inventory_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class InventoryItem {
    @Id
    private String id;

    @PrePersist
    public void generateId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }

    private String fruitName;
    private double quantityInKg;
    private int pricePerKg;

    private LocalDateTime lastUpdated;
}
