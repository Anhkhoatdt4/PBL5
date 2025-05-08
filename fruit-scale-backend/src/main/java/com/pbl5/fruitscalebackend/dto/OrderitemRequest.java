package com.pbl5.fruitscalebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderitemRequest {
    private String fruitName;
    private double weight;
    private double pricePerKg;
    private String imageUrl;
}
