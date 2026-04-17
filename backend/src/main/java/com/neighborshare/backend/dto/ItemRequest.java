package com.neighborshare.backend.dto;

import lombok.Data;

@Data
public class ItemRequest {
    private String name;
    private String description;
    private String category;
    private Double pricePerDay;
    private Double depositAmount;
    private String imageUrl;
}