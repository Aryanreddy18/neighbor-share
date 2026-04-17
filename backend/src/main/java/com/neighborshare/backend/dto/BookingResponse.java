package com.neighborshare.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BookingResponse {
    private Long id;
    private String itemName;
    private String borrowerEmail;
    private String ownerEmail;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}