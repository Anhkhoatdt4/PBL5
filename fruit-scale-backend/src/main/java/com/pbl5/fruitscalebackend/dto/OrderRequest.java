package com.pbl5.fruitscalebackend.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private String userName;
    private List<OrderitemRequest> items;
}
