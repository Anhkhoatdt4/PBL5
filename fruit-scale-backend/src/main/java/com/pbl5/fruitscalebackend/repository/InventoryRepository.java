package com.pbl5.fruitscalebackend.repository;

import com.pbl5.fruitscalebackend.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, String> {
    InventoryItem findByFruitName(String fruitName);
    List<InventoryItem> findAll();
}
