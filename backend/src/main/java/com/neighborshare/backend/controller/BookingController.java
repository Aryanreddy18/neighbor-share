package com.neighborshare.backend.controller;

import com.neighborshare.backend.dto.BookingRequest;
import com.neighborshare.backend.dto.BookingResponse;
import com.neighborshare.backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse requestItem(@RequestBody BookingRequest request,
                                       Authentication authentication) {
        return bookingService.requestItem(request, authentication.getName());
    }

    @GetMapping("/my")
    public List<BookingResponse> myBookings(Authentication authentication) {
        return bookingService.getMyBookings(authentication.getName());
    }

    @GetMapping("/incoming")
    public List<BookingResponse> incoming(Authentication authentication) {
        return bookingService.getIncomingRequests(authentication.getName());
    }

    @PutMapping("/approve/{id}")
    public BookingResponse approve(@PathVariable Long id) {
        return bookingService.approveBooking(id);
    }

    @PutMapping("/reject/{id}")
    public BookingResponse reject(@PathVariable Long id) {
        return bookingService.rejectBooking(id);
    }
}