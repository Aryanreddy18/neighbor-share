package com.neighborshare.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingRequest {
    private Long itemId;
    private LocalDate startDate;
    private LocalDate endDate;
}