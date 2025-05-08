package com.pbl5.fruitscalebackend.repository;

import com.pbl5.fruitscalebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findUserByUsername(String username);
    User findByUsernameAndPhone(String userName , String phone);
}
