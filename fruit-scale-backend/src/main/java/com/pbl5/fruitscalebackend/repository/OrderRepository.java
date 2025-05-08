package com.pbl5.fruitscalebackend.repository;

import com.pbl5.fruitscalebackend.entity.Order;
import com.pbl5.fruitscalebackend.entity.User;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    Optional<Order> findById(String id);
    List<Order> findAllByUser(User user);
}
