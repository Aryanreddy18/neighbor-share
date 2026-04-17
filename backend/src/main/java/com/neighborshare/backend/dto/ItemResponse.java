package com.neighborshare.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Double pricePerDay;
    private Double depositAmount;
    private String imageUrl;
    private String availabilityStatus;
    private String ownerName;
    private String ownerEmail;
}